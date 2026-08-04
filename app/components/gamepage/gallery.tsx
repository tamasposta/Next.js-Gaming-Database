"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import type { Gallery } from "../../types/game-details.types";

export default function Gallery({ images }: Gallery) {
  return (
    <>
      {!images?.length && <div>No gallery</div>}
      {!!images?.length && <ImageGallery items={images} showPlayButton={false} />}
    </>
  );
}
