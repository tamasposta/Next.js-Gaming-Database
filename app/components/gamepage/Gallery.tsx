'use client'
import { useEffect, useState } from "react";
import { getGameScreenshots } from "../../utils/requests";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import { Game } from "../../types/GameDetails.types";

const Gallery = ({ slug }: Game) => {
    const [formattedScreenshots, setFormattedScreenshots] = useState(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            const gameScreenshots = await getGameScreenshots(slug);
            if (gameScreenshots) {
                const formattedScreenshotsTmp = gameScreenshots.map((image) => ({
                    original: image.image,
                    thumbnail: image.image
                }));
                setFormattedScreenshots(formattedScreenshotsTmp);
            }
        }
        asyncWrapper();
    }, []);

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

// ITT TÍPUSOK NEM JÓK