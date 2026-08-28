import Link from "next/link";

type BannerProps = {
  imageUrl?: string;
  title?: string;
  slug?: string;
};

export default function Banner({ imageUrl, title, slug }: BannerProps) {
  const bgUrl =
    imageUrl ||
    "https://images.igdb.com/igdb/image/upload/t_screenshot_huge_2x/sc10tnx.jpg";

  return (
    <div
      className="bg-primary text-primary-content mx-auto px-2 min-h-[600px] flex items-center justify-center bg-cover bg-center transition-all duration-500 border-b-2 border-neutral-content"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="flex flex-col items-center w-fit h-fit gap-2 bg-base-100 p-6 rounded-md bg-opacity-80 backdrop-blur-sm text-center">
        <h1 className="text-3xl font-bold text-primary">Gaming Database</h1>
        <h2 className="text-xl text-secondary">Discover the latest and greatest games</h2>
        {title && slug && (
          <div className="mt-2 text-sm text-base-content">
            Featured game:{" "}
            <Link
              href={`/games/${slug}`}
              className="font-semibold text-primary hover:underline"
            >
              {title}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}