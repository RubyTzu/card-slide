"use client";

import { cards } from "@/app/data/cards";
import { Fragment } from "react";

export const Cards = () => {
  return (
    <section className="relative py-10 bg-stone-200 overflow-hidden scrollbar-hide ">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-stone-800 w-full">探索這個城市</h2>
      <div className="overflow-x-scroll flex snap-x snap-mandatory w-[100%] mx-auto">
        {cards.map((item, i) => {
          return (
            <Fragment key={i}>
              {Number(i) === 0 ? (
                <div className="pl-64">
                  <Card item={item} />
                </div>
              ) : Number(i) !== cards.length - 1 ? (
                <div className="">
                  <Card item={item} />
                </div>
              ) : (
                <div className="pr-64">
                  <Card item={item} />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

type CardItem = {
  title: string;
  description: string;
};

const Card = ({ item }: { item: CardItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 min-w-[50%] shrink-0 min-h-[300px] flex flex-col justify-center items-center snap-center ">
      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  );
};
