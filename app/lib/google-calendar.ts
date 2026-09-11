const dateForCalendar = (date: Date) => date.toISOString().slice(0, 10).replaceAll("-", "");

export function googleCalendarReleaseUrl(gameName: string, releaseDate?: string | null): string | null {
  const normalizedReleaseDate = releaseDate?.slice(0, 10);
  if (!normalizedReleaseDate || !/^\d{4}-\d{2}-\d{2}$/.test(normalizedReleaseDate)) {
    return null;
  }

  const today = new Date().toISOString().slice(0, 10);
  if (normalizedReleaseDate <= today) {
    return null;
  }

  const start = new Date(`${normalizedReleaseDate}T00:00:00Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${gameName} release date`,
    details: `Release date for ${gameName}.`,
    dates: `${dateForCalendar(start)}/${dateForCalendar(end)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}