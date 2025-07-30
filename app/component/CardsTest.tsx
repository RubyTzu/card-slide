"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const images = [
  { src: "/images/carousel-1.svg", label: "Pic1" },
  { src: "/images/carousel-1.svg", label: "Pic2" },
  { src: "/images/carousel-1.svg", label: "Pic3" },
];

const positions = [
  { x: -300, y: 300, rotate: -90 }, // Pic1 - left
  { x: 0, y: 0, rotate: 0 }, // Pic2 - center (visible)
  { x: 300, y: 300, rotate: 90 }, // Pic3 - right
];

export const CardsTest = () => {
    const [step, setStep] = useState(0);

    const next = () => {
      setStep((prev) => (prev + 1) % 4); // 可依需求循環次數調整
    };

    const getPosition = (i: number) => {
      const order = (i - step + 3) % 3;
      return positions[order];
    };
  return (<div className="w-[600px] h-[600px] relative overflow-hidden border mx-auto my-10">
      {images.map((img, i) => {
        const pos = getPosition(i);

        return (
          <motion.div
            key={img.label}
            className="absolute w-[200px] h-[200px] rounded-xl overflow-hidden left-1/2 top-1/2"
            animate={{
              x: pos.x,
              y: pos.y,
              rotate: pos.rotate,
            }}
            transition={{ duration: 0.6 }}
            style={{ translateX: "-50%", translateY: "-50%" }}>
            <Image src={img.src} alt={img.label} fill className="object-cover" />
          </motion.div>
        );
      })}

      <button
        className="absolute bottom-2 right-2 px-4 py-2 bg-black text-white text-sm rounded"
        onClick={next}
      >
        Next
      </button>
    </div>
  );
};
