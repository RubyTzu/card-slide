"use client";
import { useState } from "react";
import { motion } from "motion/react";

const images = [
  { src: "/images/carousel-1.svg", label: "Hate Horror Film" },
  { src: "/images/carousel-1.svg", label: "Swiftie over 13+ years" },
  { src: "/images/carousel-1.svg", label: "❤" },
  { src: "/images/carousel-1.svg", label: "Ruby." },
  { src: "/images/carousel-1.svg", label: "INFJ" },
  { src: "/images/carousel-1.svg", label: "Gemini" },
  { src: "/images/carousel-1.svg", label: "Love Sitcom" },
];

const positions = [
  { x: -3600, y: 3600, rotate: -67.5 },
  { x: -1200, y: 245, rotate: -22.5 },
  { x: -600, y: 65, rotate: -12.25 }, // Pic - left
  { x: 0, y: 0, rotate: 0 }, // Pic - center (visible)
  { x: 600, y: 65, rotate: 12.25 }, // Pic - right
  { x: 1200, y: 245, rotate: 22.5 },
  { x: 3600, y: 3600, rotate: 67.5 }
];

export const DragCards = () => {
  const [step, setStep] = useState(0);

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
        <div className="">
        {images.map((img, i) => {
          const order = (i - step + images.length) % images.length;
          const pos = getPosition(i);
          const isCenter = order === 3; // 中間那張圖在 positions 的第 3 個

          return (
            <motion.div
              key={img.label}
              onClick={() => handleClick(i)}
              className="absolute w-[80%] h-[38%] max-w-[500px] sm:w-[60%] sm:h-[85%] rounded-xl overflow-hidden left-1/2 top-1/2 noise bg-[radial-gradient(circle,rgba(255,151,82,1)_0%,rgba(255,77,0,1)_56%,rgba(204,82,0,1)_100%)] shadow-lg"
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate }}
              transition={{ duration: 0.5 }}
              style={{
                translateX: "-50%",
                translateY: "-50%",
                //  backgroundImage: `url(${img.src})`, backgroundPosition: "center", backgroundSize: "cover"
              }}
              whileHover={{
                scale: isCenter ? 1 : 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              drag
              dragConstraints={{ left: pos.x, right: pos.x, top: pos.y, bottom: pos.y }}
              onDragEnd={(e, info) => {
                console.log("Drag ended", info.offset.x);
                if (info.offset.x < -100) next(); // 向左拖 → 下一張
                else if (info.offset.x > 100) prev(); // 向右拖 → 上一張
              }}
              dragElastic={0.3}
              whileDrag={{ cursor: "grabbing" }}>
              <p className="absolute bottom-[45%] left-[50%] -translate-[50%]  text-[#16a425] text-lg font-normal tracking-widest text-center font-zilla">{img.label}</p>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
