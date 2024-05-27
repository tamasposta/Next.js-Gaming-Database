"use client";
import cheerio from "cheerio";
import { Platform } from "../types/game-details.types";

// Itt sincsenek meg a típusok

export default function useGameDetails({ description, platforms }) {
  const htmlString = description;
  const $ = cheerio.load(htmlString);
  $('p:contains("Español")').remove();
  const modifiedGameDescription = $("body").html();

  const isPlatformPc =
    platforms && platforms.find((platform: Platform) => (platform.name = "PC"));
  const pcPlatform = platforms.find(
    (platform: any) => platform.platform.name === "PC"
  );
  const reqMinimum = pcPlatform?.requirements?.minimum;
  const reqRecommended = pcPlatform?.requirements?.recommended;

  return { modifiedGameDescription, isPlatformPc, reqMinimum, reqRecommended };
}
