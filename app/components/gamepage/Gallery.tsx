import { getGameScreenshots } from "../../utils/requests";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

async function Gallery({ slug }: any) {

  const gameScreenshots = await getGameScreenshots(slug);

  const formattedScreenshots = gameScreenshots.map(image => ({
    original: image.image,
    thumbnail: image.image
  }))

  return (
    <ImageGallery 
      items={formattedScreenshots} 
      showPlayButton={false}  
    />
  );
};

export default Gallery;