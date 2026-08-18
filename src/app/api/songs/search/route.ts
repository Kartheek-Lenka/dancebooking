import { NextRequest, NextResponse } from "next/server";
import {
  SONG_INDUSTRY_CONFIG,
  type SongIndustry,
  type SongSearchResult,
} from "@/lib/songs";

const SAAVN_API = "https://saavn.sumit.co";

interface SaavnArtist {
  name: string;
}

interface SaavnSongResult {
  id: string;
  name: string;
  language: string;
  album?: { name: string };
  artists?: { primary?: SaavnArtist[] };
  image?: { quality: string; url: string }[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const industry = searchParams.get("industry") as SongIndustry | null;

  if (!query || query.length < 2) {
    return NextResponse.json({ songs: [] });
  }

  if (!industry || !(industry in SONG_INDUSTRY_CONFIG)) {
    return NextResponse.json(
      { error: "Please select Bollywood or Tollywood" },
      { status: 400 }
    );
  }

  const targetLanguage = SONG_INDUSTRY_CONFIG[industry].language;

  try {
    const url = new URL(`${SAAVN_API}/api/search/songs`);
    url.searchParams.set("query", query);
    url.searchParams.set("limit", "20");

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Song search is temporarily unavailable" },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as {
      data?: { results?: SaavnSongResult[] };
    };

    const songs: SongSearchResult[] = (payload.data?.results ?? [])
      .filter((song) => song.language === targetLanguage)
      .slice(0, 12)
      .map((song) => ({
        id: song.id,
        name: song.name,
        album: song.album?.name,
        artists: song.artists?.primary?.map((a) => a.name).join(", "),
        image:
          song.image?.find((img) => img.quality === "150x150")?.url ??
          song.image?.[0]?.url,
        language: song.language,
      }));

    return NextResponse.json({ songs });
  } catch (error) {
    console.error("Song search error:", error);
    return NextResponse.json(
      { error: "Could not search songs right now" },
      { status: 500 }
    );
  }
}
