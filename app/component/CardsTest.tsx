"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const images = [
  { src: "/images/carousel-1.svg", label: "Pic1" },
  { src: "/images/carousel-1.svg", label: "Pic2" },
  { src: "/images/carousel-1.svg", label: "Pic3" },
  { src: "/images/carousel-1.svg", label: "Pic4" },
  { src: "/images/carousel-1.svg", label: "Pic5" },
  { src: "/images/carousel-1.svg", label: "Pic6" },
  { src: "/images/carousel-1.svg", label: "Pic7" },
];

const positions = [
  { x: -840, y: 420, rotate: -67.5 },
  { x: -570, y: 240, rotate: -45 },
  { x: -300, y: 60, rotate: -22.5 }, // Pic - left
  { x: 0, y: 0, rotate: 0 }, // Pic - center (visible)
  { x: 300, y: 60, rotate: 22.5 }, // Pic - right
  { x: 570, y: 240, rotate: 45 },
  { x: 840, y: 420, rotate: 67.5 },
];

export const CardsTest = () => {
    const [step, setStep] = useState(0);

    const next = () => {
      setStep((prev) => (prev + 1) % 8); // 可依需求循環次數調整
    };

    const getPosition = (i: number) => {
      const order = (i - step + 7) % 7;
      return positions[order];
    };
  return (<div className="w-1/2 h-[300px] relative overflow-hidden mx-auto my-10">
      {images.map((img, i) => {
        const pos = getPosition(i);

        return (
          <motion.div
            key={img.label}
            className="absolute w-[10rem] h-[15rem] rounded-xl overflow-hidden left-1/2 top-1/2"
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
