import { NextRequest, NextResponse } from "next/server";
import {
  SONG_INDUSTRY_CONFIG,
  type SongIndustry,
  type SongSearchResult,
} from "@/lib/songs";

const SAAVN_API = "https://www.jiosaavn.com/api.php";

interface SaavnSongResult {
  id: string;
  title: string;
  album?: string;
  image?: string;
  more_info?: {
    language?: string;
    primary_artists?: string;
    singers?: string;
  };
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
    const url = new URL(SAAVN_API);
    url.searchParams.set("__call", "autocomplete.get");
    url.searchParams.set("_format", "json");
    url.searchParams.set("_marker", "0");
    url.searchParams.set("cc", "in");
    url.searchParams.set("includeMetaTags", "1");
    url.searchParams.set("query", query);
    url.searchParams.set("limit", "20");

    let response: Response | null = null;
    const retryDelaysMs = [300, 800];
    for (let attempt = 0; attempt <= retryDelaysMs.length; attempt++) {
      response = await fetch(url.toString(), {
        next: { revalidate: 3600 },
      });

      if (response.ok || response.status !== 429) break;
      if (attempt < retryDelaysMs.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelaysMs[attempt])
        );
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        { error: "Song search is temporarily unavailable" },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as {
      songs?: { data?: SaavnSongResult[] };
    };

    const songs: SongSearchResult[] = (payload.songs?.data ?? [])
      .filter((song) => song.more_info?.language === targetLanguage)
      .slice(0, 12)
      .map((song) => ({
        id: song.id,
        name: song.title,
        album: song.album,
        artists: song.more_info?.primary_artists,
        image: song.image,
        language: song.more_info?.language ?? "",
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
