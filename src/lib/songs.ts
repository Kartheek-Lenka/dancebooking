export const songIndustries = ["BOLLYWOOD", "TOLLYWOOD"] as const;
export type SongIndustry = (typeof songIndustries)[number];

export interface SongSearchResult {
  id: string;
  name: string;
  album?: string;
  artists?: string;
  image?: string;
  language: string;
}

export const SONG_INDUSTRY_CONFIG: Record<
  SongIndustry,
  { label: string; subtitle: string; language: string; emoji: string }
> = {
  BOLLYWOOD: {
    label: "Bollywood",
    subtitle: "Hindi songs",
    language: "hindi",
    emoji: "🎬",
  },
  TOLLYWOOD: {
    label: "Tollywood",
    subtitle: "Telugu songs",
    language: "telugu",
    emoji: "🎵",
  },
};

export function formatSongIndustry(industry: string) {
  return (
    SONG_INDUSTRY_CONFIG[industry as SongIndustry]?.label ?? industry
  );
}

export function formatSongSummary(
  name: string,
  industry: string,
  album?: string | null
) {
  const industryLabel = formatSongIndustry(industry);
  if (album) return `${name} · ${album} (${industryLabel})`;
  return `${name} (${industryLabel})`;
}
