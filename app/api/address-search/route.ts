import { NextResponse } from "next/server";
import type { AddressSearchResult } from "@/lib/account";

type NaverLocalSearchItem = {
  title?: string;
  roadAddress?: string;
  address?: string;
};

type NaverLocalSearchResponse = {
  items?: NaverLocalSearchItem[];
  errorMessage?: string;
};

function looksLikeAddress(value: string) {
  return /\d/.test(value) || /(?:로|길|동|읍|면|리)\s*\d*/.test(value);
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

function getQueryVariants(query: string) {
  const normalized = query.replace(/\s+/g, " ").trim();
  const withoutHyphenSpacing = normalized.replace(/\s*-\s*/g, "-");
  const variants = [
    normalized,
    withoutHyphenSpacing,
    `${normalized} address`,
    `${normalized} 주소`
  ];

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

async function fetchLocalPlaces(query: string): Promise<{ results: AddressSearchResult[]; message?: string; status?: number }> {
  const clientId = process.env.NAVER_DEVELOPERS_CLIENT_ID?.trim();
  const clientSecret = process.env.NAVER_DEVELOPERS_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return { results: [], message: "Naver Developers local search is not configured." };
  }

  const endpoint = new URL("https://openapi.naver.com/v1/search/local.json");
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

async function searchLocalPlaces(query: string): Promise<{ results: AddressSearchResult[]; message?: string; status?: number }> {
  let lastMessage: string | undefined;
  let lastStatus: number | undefined;

  for (const variant of getQueryVariants(query)) {
    const result = await fetchLocalPlaces(variant);

    if (result.status) {
      lastMessage = result.message;
      lastStatus = result.status;
      break;
    }

    if (result.results.length > 0) {
      return { results: result.results };
    }

    lastMessage = result.message;
  }

  return {
    results: looksLikeAddress(query) ? [typedAddressResult(query)] : [],
    message: lastMessage,
    status: lastStatus
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ results: [] satisfies AddressSearchResult[] });
  }

  const localPlaces = await searchLocalPlaces(query);

  if (localPlaces.results.length > 0) {
    return NextResponse.json({ results: localPlaces.results });
  }

  if (localPlaces.status) {
    return NextResponse.json(
      {
        results: [] satisfies AddressSearchResult[],
        message: localPlaces.message ?? "Local search failed."
      },
      { status: localPlaces.status }
    );
  }

  return NextResponse.json({
    results: looksLikeAddress(query) ? [typedAddressResult(query)] : ([] satisfies AddressSearchResult[]),
    message: localPlaces.message ?? "No results found. You can enter the address manually."
  });
}
