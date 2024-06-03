"use client";
import cheerio from "cheerio";
import type { GameDetails, Platforms } from "../types/game-details.types";

export default function useGameDetails({
  description,
  platforms,
}: GameDetails) {
  const htmlString = description;
  const $ = cheerio.load(htmlString);
  $('p:contains("Español")').remove();
  const modifiedGameDescription = $("body").html();

  const isPlatformPc =
    platforms &&
    platforms.find((platform: Platforms) => (platform.name = "PC"));
  const pcPlatform = platforms.find(
    (element: Platforms) => element?.platform?.name === "PC"
  );
  const reqMinimum = pcPlatform?.requirements?.minimum;
  const reqRecommended = pcPlatform?.requirements?.recommended;

  return { modifiedGameDescription, isPlatformPc, reqMinimum, reqRecommended };
}
