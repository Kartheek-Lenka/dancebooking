"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Check,
  Loader2,
  Music2,
  PenLine,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SONG_INDUSTRY_CONFIG,
  type SongIndustry,
  type SongSearchResult,
} from "@/lib/songs";

interface SongSelection {
  name: string;
  album?: string;
}

interface SongPickerProps {
  industry?: SongIndustry;
  songName?: string;
  songAlbum?: string;
  onIndustryChange: (industry: SongIndustry) => void;
  onSongChange: (song: SongSelection) => void;
  industryError?: string;
  songError?: string;
}

function resetSearchState(
  setters: {
    setQuery: (value: string) => void;
    setResults: (value: SongSearchResult[]) => void;
    setSearchError: (value: string | null) => void;
    setIsOpen: (value: boolean) => void;
    setIsSearching: (value: boolean) => void;
  }
) {
  setters.setQuery("");
  setters.setResults([]);
  setters.setSearchError(null);
  setters.setIsOpen(false);
  setters.setIsSearching(false);
}

export function SongPicker({
  industry,
  songName = "",
  songAlbum,
  onIndustryChange,
  onSongChange,
  industryError,
  songError,
}: SongPickerProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"search" | "manual">("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SongSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const hasSelection = Boolean(songName.trim());
  const canSearch =
    mode === "search" && Boolean(industry) && query.trim().length >= 2;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!canSearch) return;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);

      try {
        const params = new URLSearchParams({
          q: query.trim(),
          industry: industry!,
        });
        const response = await fetch(`/api/songs/search?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as {
          songs?: SongSearchResult[];
          error?: string;
        };

        if (!response.ok) {
          setResults([]);
          setSearchError(data.error ?? "Search failed");
          setIsOpen(true);
          return;
        }

        setResults(data.songs ?? []);
        setIsOpen(true);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setResults([]);
          setSearchError("Could not load songs. Try again or enter manually.");
          setIsOpen(true);
        }
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query, industry, canSearch]);

  function handleIndustrySelect(next: SongIndustry) {
    onIndustryChange(next);
    onSongChange({ name: "", album: undefined });
    resetSearchState({
      setQuery,
      setResults,
      setSearchError,
      setIsOpen,
      setIsSearching,
    });
  }

  function handleSelectSong(song: SongSearchResult) {
    onSongChange({ name: song.name, album: song.album });
    setQuery(song.name);
    setIsOpen(false);
  }

  function clearSelection() {
    onSongChange({ name: "", album: undefined });
    resetSearchState({
      setQuery,
      setResults,
      setSearchError,
      setIsOpen,
      setIsSearching,
    });
  }

  function switchMode(next: "search" | "manual") {
    setMode(next);
    onSongChange({ name: "", album: undefined });
    resetSearchState({
      setQuery,
      setResults,
      setSearchError,
      setIsOpen,
      setIsSearching,
    });
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setSearchError(null);
      setIsOpen(false);
    }
    if (hasSelection && value !== songName) {
      onSongChange({ name: "", album: undefined });
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 block text-sm font-medium text-warm-dark">
          Bollywood or Tollywood?
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(SONG_INDUSTRY_CONFIG) as SongIndustry[]).map((key) => {
            const config = SONG_INDUSTRY_CONFIG[key];
            const selected = industry === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleIndustrySelect(key)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all",
                  selected
                    ? "border-gold bg-gradient-to-br from-gold/10 to-maroon/5 ring-1 ring-gold shadow-sm"
                    : "border-cream bg-white hover:border-gold/40"
                )}
              >
                <span className="text-2xl">{config.emoji}</span>
                <p className="mt-2 font-semibold text-warm-dark">
                  {config.label}
                </p>
                <p className="text-xs text-warm-text/60">{config.subtitle}</p>
              </button>
            );
          })}
        </div>
        {industryError && (
          <p className="mt-1.5 text-sm text-red-500">{industryError}</p>
        )}
      </div>

      {industry && (
        <div className="rounded-2xl border border-cream bg-gradient-to-b from-white to-ivory/40 p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-warm-dark">
                Pick your song
              </p>
              <p className="text-xs text-warm-text/60">
                Search thousands of {SONG_INDUSTRY_CONFIG[industry].label}{" "}
                tracks, or type your own
              </p>
            </div>
            <div className="inline-flex w-fit rounded-lg border border-cream bg-white p-0.5 text-xs">
              <button
                type="button"
                onClick={() => switchMode("search")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors",
                  mode === "search"
                    ? "bg-maroon text-white"
                    : "text-warm-text/70 hover:text-warm-dark"
                )}
              >
                <Search className="h-3.5 w-3.5" />
                Search
              </button>
              <button
                type="button"
                onClick={() => switchMode("manual")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-colors",
                  mode === "manual"
                    ? "bg-maroon text-white"
                    : "text-warm-text/70 hover:text-warm-dark"
                )}
              >
                <PenLine className="h-3.5 w-3.5" />
                Type manually
              </button>
            </div>
          </div>

          {hasSelection && (
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-warm-dark">{songName}</p>
                <p className="truncate text-xs text-warm-text/60">
                  {songAlbum
                    ? `${songAlbum} · ${SONG_INDUSTRY_CONFIG[industry].label}`
                    : SONG_INDUSTRY_CONFIG[industry].label}
                </p>
              </div>
              <button
                type="button"
                onClick={clearSelection}
                className="rounded-lg p-1.5 text-warm-text/50 hover:bg-white hover:text-warm-dark"
                aria-label="Clear selected song"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {mode === "search" ? (
            <div ref={containerRef} className="relative">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-text/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => handleQueryChange(event.target.value)}
                  onFocus={() => {
                    if (canSearch && (results.length > 0 || searchError)) {
                      setIsOpen(true);
                    }
                  }}
                  placeholder={`Search ${SONG_INDUSTRY_CONFIG[industry].label} songs…`}
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-controls={listboxId}
                  className={cn(
                    "flex h-11 w-full rounded-lg border bg-white pl-10 pr-10 text-base text-warm-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
                    songError ? "border-red-400" : "border-cream"
                  )}
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gold" />
                )}
              </div>

              {isOpen && canSearch && (results.length > 0 || searchError) && (
                <div
                  id={listboxId}
                  role="listbox"
                  className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-cream bg-white shadow-xl"
                >
                  {searchError ? (
                    <p className="px-4 py-3 text-sm text-red-600">
                      {searchError}
                    </p>
                  ) : (
                    results.map((song) => (
                      <button
                        key={song.id}
                        type="button"
                        role="option"
                        aria-selected={songName === song.name}
                        onClick={() => handleSelectSong(song)}
                        className="flex w-full items-center gap-3 border-b border-cream/60 px-3 py-3 text-left last:border-b-0 hover:bg-gold/5"
                      >
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-cream">
                          {song.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={song.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Music2 className="h-4 w-4 text-gold" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-warm-dark">
                            {song.name}
                          </p>
                          <p className="truncate text-xs text-warm-text/60">
                            {[song.album, song.artists]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}

              {!isSearching &&
                canSearch &&
                results.length === 0 &&
                !searchError &&
                !hasSelection && (
                  <p className="mt-2 text-xs text-warm-text/60">
                    No matches found. Switch to{" "}
                    <button
                      type="button"
                      onClick={() => switchMode("manual")}
                      className="font-medium text-maroon underline-offset-2 hover:underline"
                    >
                      type manually
                    </button>
                    .
                  </p>
                )}

              {query.trim().length > 0 && query.trim().length < 2 && (
                <p className="mt-2 text-xs text-warm-text/60">
                  Type at least 2 characters to search.
                </p>
              )}
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={songName}
                onChange={(event) =>
                  onSongChange({ name: event.target.value, album: undefined })
                }
                placeholder="Enter the song name you want to learn"
                className={cn(
                  "flex h-11 w-full rounded-lg border bg-white px-4 text-base text-warm-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
                  songError ? "border-red-400" : "border-cream"
                )}
              />
              <p className="mt-2 text-xs text-warm-text/60">
                Perfect if your song isn&apos;t in the catalog yet.
              </p>
            </div>
          )}

          {songError && <p className="mt-1.5 text-sm text-red-500">{songError}</p>}
        </div>
      )}
    </div>
  );
}
