"use client";
import Link from "next/link";
import type { Game } from "../types/games.types";
import Image from "next/image";

export default function Card({
  name,
  metacritic,
  released,
  slug,
  background_image,
}: Game) {
  return (
    <div className="bg-neutral rounded-md hover:outline hover:outline-2 hover:outline-neutral-content outline outline-neutral sm:w-[280px] h-full">
      <div
        className="w-full h-[180px] max-sm:h-[220px] bg-cover bg-center rounded-t-md"
        style={{ backgroundImage: `url(${background_image})` }}
      ></div>
      <div className="flex flex-col pb-3 items-center gap-3">
        <div className="flex justify-base p-2 pr-[30px] w-full bg-base-200 max-sm:min-w-[90vw]">
          <Image
            className="pr-2 cursor-pointer"
            title="Add to favorite"
            alt="Add to favorite"
            src="/star-none.svg"
            width="30"
            height="30"
          />
          {/* TODO: Keep the following line until backend is not done. */}
          {/* <Image className='pr-2 cursor-pointer' title='Remove from favorite' alt="Remove from favorite" src="/star.svg" width="30" height="30" /> */}
          <h2
            className="text-base font-semibold text-center w-full"
            title={name}
          >
            {name.length > 20 ? name.slice(0, 20) + "..." : name}
          </h2>
        </div>
        <div className="flex flex-row">
          <Image
            className="w-[20px] mr-2"
            src="/images/Metacritic.svg"
            width="20"
            height="20"
            alt="Metacritic"
          />
          {metacritic == null ? (
            <h3 className="text-sm">Metacritic score: N/A</h3>
          ) : (
            <h3 className="text-sm">Metacritic score: {metacritic}</h3>
          )}
        </div>
        <h4 className="text-sm">Release date: {released}</h4>
        <Link
          href={`/games/${slug}`}
          className="btn btn-outline btn-primary btn-sm"
        >
          See details
        </Link>
        {/* <Link href={`/games/${slug}`}>
          <a className="btn btn-outline btn-primary btn-sm">See details</a>
        </Link> */}
      </div>
    </div>
  );
}
