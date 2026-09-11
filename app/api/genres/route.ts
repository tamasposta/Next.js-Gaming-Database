import { NextResponse } from "next/server";
import { getGenres } from "../../utils/requests";

export async function GET() {
  return NextResponse.json({ data: await getGenres() });
}