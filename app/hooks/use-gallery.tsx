"use client";
import { useState, useEffect } from "react";
import type { GameScreenshots } from "../types/game-screnshots.types";
import { getGameScreenshots } from "../utils/requests";
import type { GalleryPageProps } from "../types/gallery-page-props.types";

export default function useGallery({ slug }: GalleryPageProps) {
  const [formattedScreenshots, setFormattedScreenshots] = useState<
    GameScreenshots[] | null
  >(null);

  useEffect(() => {
    const asyncWrapper = async () => {
      const gameScreenshots: GameScreenshots[] = await getGameScreenshots(slug);
      if (gameScreenshots) {
        const formattedScreenshotsTmp: GameScreenshots[] = gameScreenshots.map(
          (image) => ({
            image: image.image,
            original: image.image,
            thumbnail: image.image,
          })
        );
        setFormattedScreenshots(formattedScreenshotsTmp);
      }
    };
    asyncWrapper();
  });

  return { formattedScreenshots };
}
