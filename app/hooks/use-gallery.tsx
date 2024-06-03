"use client";
import { useState, useEffect } from "react";
import { GameScreenshots } from "../types/game-screnshots.types";
import { getGameScreenshots } from "../utils/requests";
import { GalleryPageProps } from "../types/gallery-page-props.types";

// Itt sincsenek meg a típusok

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
