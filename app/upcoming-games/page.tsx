import Card from "../components/card";
import { getUpcomingGamesByMonth } from "../utils/requests";

const monthName = (year: number, month: number) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));

export default async function UpcomingGamesPage() {
  const monthlyGames = await getUpcomingGamesByMonth();
  const years = Array.from(new Set(monthlyGames.map(({ year }) => year)));
  const now = new Date();
  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth() + 1;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
      <header className="flex w-full flex-col items-start gap-2">
        <h1 className="text-3xl font-bold text-primary">Upcoming Games</h1>
        <p className="w-full border-b-2 border-neutral-content pb-4 text-xl text-secondary">
          The 10 most popular games for every month of {years.join(" and ")}.
          Popularity is ranked by IGDB hypes. Past months in {years[0]} are
          included as well.
        </p>
      </header>

      {years.map((year) => (
        <section key={year} className="flex flex-col gap-8" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="text-2xl font-semibold text-primary">
            {year}
          </h2>
          <div className="flex flex-col gap-4">
            {monthlyGames
              .filter((month) => month.year === year)
              .map(({ month, games }) => (
                <details
                  key={`${year}-${month}`}
                  open={year === currentYear && month === currentMonth}
                  className="rounded-lg border border-neutral-content bg-base-200"
                >
                  <summary
                    id={`month-${year}-${month}`}
                    className="cursor-pointer px-4 py-3 text-xl font-medium marker:text-primary"
                  >
                    {monthName(year, month)}
                  </summary>
                  {games === null ? (
                    <p role="status" className="px-4 pb-4 text-base-content/75">
                      Games for this month could not be loaded.
                    </p>
                  ) : games.length > 0 ? (
                    <div className="grid grid-cols-1 items-start gap-6 border-t border-neutral-content p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {[...games]
                        .sort((first, second) =>
                          first.released_iso.localeCompare(second.released_iso)
                        )
                        .map((game) => (
                          <Card key={game.id} {...game} />
                        ))}
                    </div>
                  ) : (
                    <p className="px-4 pb-4 text-base-content/75">
                      No games with a confirmed release date were found for this month.
                    </p>
                  )}
                </details>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
