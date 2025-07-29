"use client";

import { cards } from "@/app/data/cards";

export const Cards = () => {

  return (
    <section className="relative w-full py-10 bg-stone-200 overflow-hidden scrollbar-hide">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-stone-800">探索這個城市</h2>
      <div className="snap-x">
        {/* <div className=""> */}
          {cards.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 m-4 w-[300px]">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        {/* </div> */}
      </div>
    </section>
  );
};
