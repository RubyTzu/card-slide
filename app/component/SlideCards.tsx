"use client";

import Image from "next/image";
import { Fragment } from "react";

const slides = [
  {
    id: 1,
    title: "Himil Suite",
    description: "Warm textures, stone & wood, and a view you’ll remember.",
    image: "/images/carousel-1.svg",
  },
  {
    id: 2,
    title: "Mountain View",
    description: "Floor-to-ceiling windows bring the Alps to your bedside.",
    image: "/images/carousel-1.svg",
  },
  {
    id: 3,
    title: "Cozy Living",
    description: "A snug lounge with custom furniture and ambient lighting.",
    image: "/images/carousel-1.svg",
  },
];

export const SlideCards = () => {
  return (
    <>
      <section className="flex justify-center items-center gap-20">
        <div className=" w-[50vw] h-[50vh] md:w-[30vw] md:h-[50vh] border overflow-hidden flex ">
          {slides.map((s, idx) => {
            return <Fragment key={idx}>
                <Image width={300} height={300} src={s.image} alt="" className="w-fit h-fit border border-amber-500" />
             </Fragment>;
          })}
        </div>
        <div>
          <div>&rarr;</div>
          <div>&larr;</div>
        </div>
      </section>
    </>
  );
};
