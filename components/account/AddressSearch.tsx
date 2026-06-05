"use client";

import { useState } from "react";
import type { AddressSearchResult } from "@/lib/account";
import styles from "@/components/account/AddressSearch.module.css";

type AddressSearchResponse = {
  results: AddressSearchResult[];
  message?: string;
};

type AddressSearchProps = {
  onSelect: (result: AddressSearchResult) => void;
  placeholder?: string;
};

export default function AddressSearch({ onSelect, placeholder }: AddressSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AddressSearchResult[]>([]);
  const [message, setMessage] = useState("");
  const [searching, setSearching] = useState(false);

  async function runSearch() {
    if (query.trim().length < 2) {
      setMessage("Enter at least two characters.");
      return;
    }

    setSearching(true);
    setMessage("");

    try {
      const response = await fetch(`/api/address-search?query=${encodeURIComponent(query.trim())}`);
      const data = (await response.json()) as AddressSearchResponse;
      setResults(data.results);
      setMessage(data.message ?? (data.results.length === 0 ? "No results found. You can enter the address manually." : ""));
    } catch {
      setResults([]);
      setMessage("Address search failed. You can enter the address manually.");
    } finally {
      setSearching(false);
    }
  }

  function handleSelect(result: AddressSearchResult) {
    onSelect(result);
    setResults([]);
    setQuery(result.roadAddress || result.jibunAddress);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inlineSearch}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void runSearch();
            }
          }}
          placeholder={placeholder ?? "Road name, building, or place"}
          aria-label="Search address"
        />
        <button type="button" onClick={runSearch} disabled={searching}>
          {searching ? "Searching" : "Search"}
        </button>
      </div>
      {results.length > 0 ? (
        <div className={styles.results}>
          {results.map((result) => {
            const detail =
              result.jibunAddress && result.jibunAddress !== result.title
                ? result.jibunAddress
                : result.roadAddress && result.roadAddress !== result.title
                  ? result.roadAddress
                  : "";
            const secondary = [result.postalCode ? `우 ${result.postalCode}` : "", detail].filter(Boolean).join(" · ");

            return (
              <button key={result.id} type="button" onClick={() => handleSelect(result)}>
                <span>{result.title}</span>
                {secondary ? <small>{secondary}</small> : null}
              </button>
            );
          })}
        </div>
      ) : null}
      {message ? <p className={styles.message}>{message}</p> : null}
    </div>
  );
}
