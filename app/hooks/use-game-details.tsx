"use client";
import cheerio from "cheerio";

export default function useGameDetails({ description, platforms, website }) {
  const htmlString = description;
  const $ = cheerio.load(htmlString);
  $('p:contains("Español")').remove();
  const modifiedGameDescription = $("body").html();

  const isPlatformPc =
    platforms && platforms.find((platform) => (platform.name = "PC"));
  const pcPlatform = platforms.find(
    (platform) => platform.platform.name === "PC"
  );
  const reqMinimum = pcPlatform?.requirements?.minimum;
  const reqRecommended = pcPlatform?.requirements?.recommended;

  return { modifiedGameDescription, isPlatformPc, reqMinimum, reqRecommended };
}
