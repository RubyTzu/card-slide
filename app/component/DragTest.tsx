"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useDragControls } from "motion/react";

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

export const DragTest = () => {
  const [step, setStep] = useState(0);
  const controls = useDragControls();

  const next = () => setStep((prev) => (prev + 1) % images.length);
  const prev = () => setStep((prev) => (prev - 1 + images.length) % images.length);
  const handleClick = (i: number) => {
    const centerIndex = 3;
    const order = (i - step + images.length) % images.length;
    const diff = order - centerIndex;

    if (diff !== 0) {
      setStep((prev) => (prev + diff + images.length) % images.length);
    }
  };

  const getPosition = (i: number) => {
    const order = (i - step + images.length) % images.length;
    return positions[order];
  };
  return (
    <>
      <div className="w-full h-[500px] relative overflow-hidden mx-auto my-10">
        {images.map((img, i) => {
          const order = (i - step + images.length) % images.length;
          const pos = getPosition(i);
          const isCenter = order === 3; // 中間那張圖在 positions 的第 3 個

          return (
            <motion.div
              key={img.label}
              onClick={() => handleClick(i)}
              className=" absolute w-[10rem] h-[15rem] border rounded-xl overflow-hidden left-1/2 top-1/2 cursor-grab"
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
              transition={{ duration: 0.5 }}
              style={{ translateX: "-50%", translateY: "-50%", backgroundImage: `url(${img.src})`, backgroundPosition: "center", backgroundSize: "cover" }}
              drag
              dragConstraints={{ left: pos.x, right: pos.x, top: pos.y, bottom: pos.y }}
              onDragEnd={(e, info) => {
                console.log("Drag ended", info.offset.x);
                if (info.offset.x < -100) next(); // 向左拖 → 下一張
                else if (info.offset.x > 100) prev(); // 向右拖 → 上一張
              }}
              dragElastic={0.3}
              whileDrag={{ cursor: "grabbing" }}>
              <p className="absolute top-[20%] left-[50%] -translate-[50%]  text-blue-100 font-light tracking-widest">{img.label}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
