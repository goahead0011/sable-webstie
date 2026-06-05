import { NextResponse } from "next/server";
import type { AddressSearchResult } from "@/lib/account";

// Address search combines two Naver sources so both query styles work:
//   1. Primary  - Naver Cloud Platform Geocoding: resolves a typed road/jibun
//      address (e.g. "일동로 157-1") into address candidates with postal codes.
//   2. Secondary - Naver Developers Local Search: resolves a place/business name
//      (e.g. "성수동 카페") into nearby addresses.
// Each source is skipped when its credentials are missing, so the route degrades
// gracefully instead of failing.

const GEOCODE_ENDPOINT = "https://maps.apigw.ntruss.com/map-geocode/v2/geocode";
const LOCAL_SEARCH_ENDPOINT = "https://openapi.naver.com/v1/search/local.json";

type NaverGeocodeAddressElement = {
  types?: string[];
  longName?: string;
  shortName?: string;
};

type NaverGeocodeAddress = {
  roadAddress?: string;
  jibunAddress?: string;
  addressElements?: NaverGeocodeAddressElement[];
};

type NaverGeocodeResponse = {
  status?: string;
  addresses?: NaverGeocodeAddress[];
  errorMessage?: string;
};

type NaverLocalSearchItem = {
  title?: string;
  roadAddress?: string;
  address?: string;
};

type NaverLocalSearchResponse = {
  items?: NaverLocalSearchItem[];
  errorMessage?: string;
};

type SourceResult = { results: AddressSearchResult[]; message?: string; status?: number };

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

function looksLikeAddress(value: string) {
  return /\d/.test(value) || /(?:로|길|동|읍|면|리)\s*\d*/.test(value);
}

function normalizeQuery(query: string) {
  return query.replace(/\s+/g, " ").trim();
}

function getLocalQueryVariants(query: string) {
  const normalized = normalizeQuery(query);
  const variants = [normalized, normalized.replace(/\s*-\s*/g, "-")];
  return Array.from(new Set(variants.filter(Boolean)));
}

function typedAddressResult(query: string): AddressSearchResult {
  return {
    id: `typed-${query}`,
    title: "Use typed address",
    roadAddress: query,
    jibunAddress: "",
    postalCode: ""
  };
}

function dedupeResults(results: AddressSearchResult[]) {
  const seen = new Set<string>();
  const deduped: AddressSearchResult[] = [];

  for (const result of results) {
    const key = (result.roadAddress || result.jibunAddress || result.title).trim();
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(result);
  }

  return deduped;
}

// Primary source: Naver Cloud Platform Geocoding (typed road / jibun address).
async function geocodeAddress(query: string): Promise<SourceResult> {
  const keyId = process.env.NCP_MAP_CLIENT_ID?.trim();
  const key = process.env.NCP_MAP_CLIENT_SECRET?.trim();

  if (!keyId || !key) {
    return { results: [] };
  }

  const endpoint = new URL(GEOCODE_ENDPOINT);
  endpoint.searchParams.set("query", normalizeQuery(query));

  const response = await fetch(endpoint, {
    headers: {
      "x-ncp-apigw-api-key-id": keyId,
      "x-ncp-apigw-api-key": key,
      Accept: "application/json"
    },
    cache: "no-store"
  });
  const data = (await response.json().catch(() => null)) as NaverGeocodeResponse | null;

  if (!response.ok || (data?.status && data.status !== "OK")) {
    return {
      results: [],
      message: data?.errorMessage || "Geocoding failed.",
      status: response.ok ? undefined : response.status
    };
  }

  const results =
    data?.addresses
      ?.filter((address) => address.roadAddress || address.jibunAddress)
      .map((address, index) => {
        const roadAddress = address.roadAddress ?? "";
        const jibunAddress = address.jibunAddress ?? "";
        const postalCode =
          address.addressElements?.find((element) => element.types?.includes("POSTAL_CODE"))?.longName ?? "";

        return {
          id: `geo-${index}-${roadAddress || jibunAddress}`,
          title: roadAddress || jibunAddress,
          roadAddress,
          jibunAddress,
          postalCode
        };
      }) ?? [];

  return { results };
}

// Secondary source: Naver Developers Local Search (place / business name).
async function fetchLocalPlaces(query: string): Promise<SourceResult> {
  const clientId = process.env.NAVER_DEVELOPERS_CLIENT_ID?.trim();
  const clientSecret = process.env.NAVER_DEVELOPERS_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return { results: [] };
  }

  const endpoint = new URL(LOCAL_SEARCH_ENDPOINT);
  endpoint.searchParams.set("query", query);
  endpoint.searchParams.set("display", "5");
  endpoint.searchParams.set("sort", "random");

  const response = await fetch(endpoint, {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
      Accept: "application/json"
    },
    cache: "no-store"
  });
  const data = (await response.json().catch(() => null)) as NaverLocalSearchResponse | null;

  if (!response.ok) {
    return {
      results: [],
      message: data?.errorMessage ?? "Local search failed.",
      status: response.status
    };
  }

  const results =
    data?.items
      ?.filter((item) => item.roadAddress || item.address)
      .map((item, index) => {
        const title = stripHtml(item.title ?? query);
        const roadAddress = item.roadAddress ?? "";
        const jibunAddress = item.address ?? "";

        return {
          id: `place-${index}-${roadAddress || jibunAddress || title}`,
          title,
          roadAddress,
          jibunAddress,
          postalCode: ""
        };
      }) ?? [];

  return { results };
}

async function searchLocalPlaces(query: string): Promise<SourceResult> {
  let lastMessage: string | undefined;
  let lastStatus: number | undefined;

  for (const variant of getLocalQueryVariants(query)) {
    const result = await fetchLocalPlaces(variant);

    if (result.status) {
      return { results: [], message: result.message, status: result.status };
    }

    if (result.results.length > 0) {
      return { results: result.results };
    }

    lastMessage = result.message;
  }

  return { results: [], message: lastMessage, status: lastStatus };
}

async function searchAddresses(query: string): Promise<SourceResult> {
  const [geocoded, localPlaces] = await Promise.all([geocodeAddress(query), searchLocalPlaces(query)]);

  const merged = dedupeResults([...geocoded.results, ...localPlaces.results]);

  if (merged.length > 0) {
    return { results: merged };
  }

  return {
    results: looksLikeAddress(query) ? [typedAddressResult(query)] : [],
    message: geocoded.message ?? localPlaces.message,
    status: geocoded.status ?? localPlaces.status
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] satisfies AddressSearchResult[] });
  }

  const { results, message } = await searchAddresses(query);

  if (results.length > 0) {
    return NextResponse.json({ results });
  }

  return NextResponse.json({
    results: [] satisfies AddressSearchResult[],
    message: message ?? "No results found. You can enter the address manually."
  });
}
