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
import { Button } from "@/components/ui/button";
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
  songs?: SongSelection[];
  onIndustryChange: (industry: SongIndustry) => void;
  onSongsChange: (songs: SongSelection[]) => void;
  industryError?: string;
  songError?: string;
}

export function SongPicker({
  industry,
  songs = [],
  onIndustryChange,
  onSongsChange,
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

  const hasSelection = songs.length > 0;
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
    onSongsChange([]);
    setQuery("");
    setResults([]);
    setSearchError(null);
    setIsOpen(false);
    setIsSearching(false);
  }

  function handleSelectSong(song: SongSearchResult) {
    if (songs.some((s) => s.name === song.name)) return;
    onSongsChange([...songs, { name: song.name, album: song.album }]);
    setQuery("");
    setIsOpen(false);
  }

  function removeSong(index: number) {
    onSongsChange(songs.filter((_, i) => i !== index));
  }

  function clearAllSongs() {
    onSongsChange([]);
    setQuery("");
    setResults([]);
    setSearchError(null);
    setIsOpen(false);
    setIsSearching(false);
  }

  function switchMode(next: "search" | "manual") {
    setMode(next);
    setQuery("");
    setResults([]);
    setSearchError(null);
    setIsOpen(false);
    setIsSearching(false);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setSearchError(null);
      setIsOpen(false);
    }
  }

  function handleManualAdd(name: string) {
    if (!name.trim()) return;
    if (songs.some((s) => s.name === name.trim())) return;
    onSongsChange([...songs, { name: name.trim() }]);
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
                Pick your songs
              </p>
              <p className="text-xs text-warm-text/60">
                Search and add multiple {SONG_INDUSTRY_CONFIG[industry].label}{" "}
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
            <div className="mb-4 space-y-2">
              {songs.map((song, index) => (
                <div
                  key={`${song.name}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-warm-dark">
                      {song.name}
                    </p>
                    {song.album && (
                      <p className="truncate text-xs text-warm-text/60">
                        {song.album}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSong(index)}
                    className="rounded-lg p-1 text-warm-text/50 hover:bg-white hover:text-warm-dark"
                    aria-label={`Remove ${song.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={clearAllSongs}
                className="text-xs text-warm-text/50 hover:text-warm-dark transition-colors"
              >
                Clear all
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
                    results.map((song) => {
                      const isSelected = songs.some((s) => s.name === song.name);
                      return (
                        <button
                          key={song.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectSong(song)}
                          className={cn(
                            "flex w-full items-center gap-3 border-b border-cream/60 px-3 py-3 text-left last:border-b-0 transition-colors",
                            isSelected
                              ? "bg-emerald-50"
                              : "hover:bg-gold/5"
                          )}
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
                          {isSelected && (
                            <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              )}

              {!isSearching &&
                canSearch &&
                results.length === 0 &&
                !searchError && (
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
            <ManualSongInput onAdd={handleManualAdd} />
          )}

          {songError && <p className="mt-1.5 text-sm text-red-500">{songError}</p>}
        </div>
      )}
    </div>
  );
}

function ManualSongInput({ onAdd }: { onAdd: (name: string) => void }) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter the song name you want to learn"
          className="flex h-11 flex-1 rounded-lg border border-cream bg-white px-4 text-base text-warm-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
        />
        <Button type="submit" size="sm" variant="outline" className="shrink-0">
          Add
        </Button>
      </div>
      <p className="text-xs text-warm-text/60">
        Press Enter or click Add. Add multiple songs if you like.
      </p>
    </form>
  );
}
