import type {
  GameDetails,
} from "../../types/game-details.types";

export default function Rating({ rating }: GameDetails) {
  if (rating == null || rating === 0) {
    return null;
  }

  // rating is a 1-5 score derived from IGDB total_rating (which is 0-100)
  const percentage = Math.round(rating * 20);

  // Dynamic color based on percentage
  const getColor = (pct: number) => {
    if (pct >= 85) return "#00cdb8"; // Exceptional / Teal
    if (pct >= 70) return "#7480ff"; // Recommended / Blue
    if (pct >= 50) return "#ffbe00"; // Meh / Yellow
    return "#ff5861"; // Skip / Red
  };

  const getLabel = (pct: number) => {
    if (pct >= 85) return "Exceptional";
    if (pct >= 70) return "Recommended";
    if (pct >= 50) return "Meh";
    return "Skip";
  };

  const color = getColor(percentage);
  const label = getLabel(percentage);

  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl text-secondary">
          User Rating: {" "}
          <span className="text-sm opacity-80" style={{ color }}>
            ({percentage}% - {label})
          </span>
        </h3>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-neutral rounded-full h-6 overflow-hidden p-0.5 border border-neutral/50 shadow-inner relative">
        <div
          className="h-full rounded-full transition-all duration-700 flex items-center justify-center text-xs font-bold text-black"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        >
          {percentage >= 10 && `${percentage}%`}
        </div>
      </div>
    </div>
  );
}
