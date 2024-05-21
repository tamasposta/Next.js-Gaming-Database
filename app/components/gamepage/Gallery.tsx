'use client'
import { useEffect, useState } from "react";
import { getGameScreenshots } from "../../utils/requests";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import { Game } from "../../types/GameDetails.types";

type GameScreenshots = {
    image: string,
    original: string,
    thumbnail: string
};

const Gallery = ({ slug }: Game) => {
    const [formattedScreenshots, setFormattedScreenshots] = useState<GameScreenshots[] | null>(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            const gameScreenshots: GameScreenshots[] = await getGameScreenshots(slug);
            if (gameScreenshots) {
                const formattedScreenshotsTmp: GameScreenshots[] = gameScreenshots.map((image) => ({
                    image: image.image,
                    original: image.image,
                    thumbnail: image.image
                }));
                setFormattedScreenshots(formattedScreenshotsTmp);
            }
        }
        asyncWrapper();
    });

    return (
        <>
            {!formattedScreenshots && <div>No gallery</div>}
            {!!formattedScreenshots && (
                <ImageGallery
                    items={formattedScreenshots}
                    showPlayButton={false}
                />
            )}
        </>
    );
};

export default Gallery;