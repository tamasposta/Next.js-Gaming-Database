import {
  GameDetails,
  Rating,
  RatingColors,
} from "../../types/game-details.types";

// Itt nincsenek meg a típusok

export default function Rating({ rating, ratings }: GameDetails) {
  const ratingColors: RatingColors = {
    exceptional: "#00cdb8",
    recommended: "#7480ff",
    meh: "#ffbe00",
    skip: "#ff5861",
  };

  return (
    <div className="py-10">
      <h3 className="text-2xl text-secondary">
        Rating: <span className="text-xl text-primary">{rating}/5</span>
      </h3>
      {ratings?.map(({ title, count }: Rating, index: number) => {
        const color = ratingColors[title] || "white";
        return (
          <div className="pt-3" key={index}>
            <p>
              <span style={{ color }}>{title.toUpperCase()}: </span>
              <strong>{count}</strong>
            </p>
          </div>
        );
      })}
      <div className="flex flex-row flex-nowrap mt-2">
        {ratings.map(({ title, percent }: Rating, index: number) => {
          const background = ratingColors[title] || "white";
          return (
            <div key={index} style={{ width: `${percent}%` }}>
              <button
                className="btn btn-primary border-0 rounded-none btn-sm text-xs w-full"
                style={{ background }}
              >
                {Math.round(percent)}%
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
