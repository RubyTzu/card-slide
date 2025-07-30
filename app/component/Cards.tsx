"use client";

import { cards } from "@/app/data/cards";
import { Fragment, useState } from "react";

export const Cards = () => {
  
  return (
    <section className="relative py-10 bg-stone-200 overflow-hidden scrollbar-hide w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-stone-800 w-full">探索這個城市</h2>
      <div className="overflow-x-scroll flex snap-x snap-mandatory w-[100%] mx-auto px-[20%] scroll-pl-20 scroll-pr-20 scroll-smooth no-scrollbar" style={{ scrollPaddingLeft: "10%", scrollPaddingRight: "10%" }}>
        {cards.map((item, i) => {
          return <Fragment key={i}>{Number(i) === 0 ? <Card item={item} /> : Number(i) !== cards.length - 1 ? <Card item={item} /> : <Card item={item} />}</Fragment>;
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
    <div className={`bg-white rounded-lg shadow-md p-6 m-4 w-[80%] min-h-64 md:min-w-[60%] shrink-0 md:min-h-[300px] flex flex-col justify-center items-center snap-center `}>
      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  );
};
