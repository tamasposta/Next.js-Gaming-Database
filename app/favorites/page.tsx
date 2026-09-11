import GameLibraryPage from "../components/game-library-page";

export default function FavoritesPage() {
  return <GameLibraryPage title="My Favorites" endpoint="/favorites" emptyMessage="You have not added any favorite games yet." />;
}