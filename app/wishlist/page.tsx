import GameLibraryPage from "../components/game-library-page";

export default function WishlistPage() {
  return <GameLibraryPage title="My Wishlist" endpoint="/wishlist" emptyMessage="Your wishlist is empty." />;
}