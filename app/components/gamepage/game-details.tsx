"use client";
import Image from "next/image";
import Link from "next/link";
import type { GameDetails, Platforms } from "../../types/game-details.types";
import useGameDetails from "../../hooks/use-game-details";

export default function GameDetails({
  description,
  platforms,
  website,
  genres,
  companies,
  videos,
  collection,
}: GameDetails) {
  const { modifiedGameDescription, isPlatformPc, reqMinimum, reqRecommended } =
    useGameDetails({ description, platforms });

  const websiteLength = website?.length ?? 0;
  const developers = companies?.filter((c) => c.isDeveloper) ?? [];
  const publishers = companies?.filter((c) => c.isPublisher) ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* Trailer Video */}
      {videos && videos.length > 0 && (
        <div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].videoId}`}
              title={videos[0].name || "Game Trailer"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Description */}
      <div
        className="text-justify"
        dangerouslySetInnerHTML={{ __html: modifiedGameDescription || "" }}
      ></div>

      {/* Genres */}
      {genres && genres.length > 0 && (
        <div>
          <h2 className="text-2xl text-secondary mb-3">Genres:</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <Link
                key={g.id}
                href={`/games?genre=${g.slug}`}
                className="btn btn-outline btn-primary btn-sm rounded-full transition"
              >
                {g.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Developers & Publishers */}
      {((developers && developers.length > 0) ||
        (publishers && publishers.length > 0)) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-base-200 p-4 rounded-xl">
          {developers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-1">
                Developer{developers.length > 1 ? "s" : ""}:
              </h3>
              <div className="flex flex-col gap-1">
                {developers.map((dev) => (
                  <div key={dev.id} className="text-base-content">
                    {dev.website ? (
                      <a
                        href={dev.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary hover:text-secondary"
                      >
                        {dev.name}
                      </a>
                    ) : (
                      <span>{dev.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {publishers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-1">
                Publisher{publishers.length > 1 ? "s" : ""}:
              </h3>
              <div className="flex flex-col gap-1">
                {publishers.map((pub) => (
                  <div key={pub.id} className="text-base-content">
                    {pub.website ? (
                      <a
                        href={pub.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-primary hover:text-secondary"
                      >
                        {pub.name}
                      </a>
                    ) : (
                      <span>{pub.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Platforms */}
      <div>
        <h2 className="text-2xl text-secondary">Platforms: </h2>
        <div className="grid grid-cols-6 max-lg:grid-cols-8 max-md:grid-cols-3 pt-4 gap-2">
          {platforms &&
            platforms.map((element: Platforms) => {
              const platformIcon = `/images/platform-icons/${element?.platform?.slug}.svg`;
              return (
                <div key={element?.platform?.id}>
                  <Image
                    className="w-14"
                    src={platformIcon}
                    alt={element?.platform?.name ?? ""}
                    title={element?.platform?.name}
                    width="200"
                    height="200"
                  />
                </div>
              );
            })}
        </div>
      </div>

      {/* System Requirements & Website */}
      <div>
        <h2 className="text-2xl text-secondary pt-4">
          System requirements:{" "}
        </h2>
        {isPlatformPc ? (
          <>
            {!reqMinimum && !reqRecommended && (
              <div>No system requirements data.</div>
            )}
            {reqMinimum && <div className="text-justify">{reqMinimum}</div>}
            {reqRecommended && (
              <div className="text-justify pt-5">{reqRecommended}</div>
            )}
          </>
        ) : (
          <div>No system requirements data.</div>
        )}
        {websiteLength > 0 && (
          <div className="pt-6">
            <h3 className="text-2xl text-secondary">Website:</h3>
            <a
              className="underline text-wrap text-primary hover:text-secondary"
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
