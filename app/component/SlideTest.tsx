"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

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

const Dots = ({ count, active }: { count: number; active: number }) => (
  <div className="flex flex-row justify-center relative bottom-5">
    {slides.map((_, i) => (
      <motion.div
        key={i}
        className="flex flex-row justify-center relative bottom-5"
        initial={false}
        animate={{
          scale: active === i ? 1.5 : 1,
          opacity: active === i ? 1 : 0.5,
        }}
      />
    ))}
  </div>
);

const Slide = ({ color, ...rest }: { color: string }) => <div style={{ backgroundColor: color }} className="min-w-full h-full" {...rest} />;

// 小工具：安全 modulo（可處理負數）
const mod = (n: number, m: number) => ((n % m) + m) % m;

export const SlideTest = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  // 原始 slides
  const baseSlides = ["blue", "green", "orange"];

  // 3 份擴充，開在中間那份
  const copies = 3;
  const total = baseSlides.length;
  const extended = Array.from({ length: copies * total }, (_, i) => {
    const baseIdx = mod(i, total);
    return { i, color: baseSlides[baseIdx], baseIdx };
  });

  // 索引起點：中間那份的第一張
  const middleStart = total; // 0..(total-1) | middleStart.. | 2*total..
  const [index, setIndex] = useState(middleStart);
  const [immediate, setImmediate] = useState(false);

  const [width, setWidth] = useState(350);

  // 量 container 寬
  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth || 350);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // 顯示用的「實際第幾張」（0..total-1）
  const display = mod(index, total);

  // 拖曳結束：依拖曳距離決定是否換張
  const onDragEnd = (_: any, info: { offset: { x: number } }) => {
    const offsetX = info.offset.x;
    const threshold = Math.max(30, width * 0.15); // 拖超過 15% 寬就換
    if (Math.abs(offsetX) > threshold) {
      // 向左拖（offsetX < 0）→ 下一張；向右拖 → 上一張
      const dir = offsetX < 0 ? 1 : -1;
      setIndex((i) => i + dir);
    } else {
      // 回到原位
      // 什麼都不做，動畫會把它彈回
    }
  };

  // 兩個輔助切換（按鈕用）
  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  // 走到邊界就「瞬移」回中間那份對應的位置，避免長走造成邊緣卡住
  useEffect(() => {
    const lowerBound = 0 + 1; // 留 1 張緩衝
    const upperBound = copies * total - 2; // 留 1 張緩衝
    if (index <= lowerBound || index >= upperBound) {
      const normalized = middleStart + mod(index, total);
      // 下一個動畫循環前把 transition 設成 0 做瞬移
      setImmediate(true);
      setIndex(normalized);
      // 下一個 frame 再恢復動畫
      requestAnimationFrame(() => setImmediate(false));
    }
  }, [index, copies, total]);

  return (
    <>
      <div className="relative overflow-hidden" ref={containerRef}>
        {/* 左右控制鈕（可選） */}
        <button className="nav prev" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="nav next" onClick={next} aria-label="Next">
          ›
        </button>

        <motion.div
          className="flex w-full h-[250px] flex-row"
          drag="x"
          onDragEnd={onDragEnd}
          // 用 index 決定 x，從「中間那份」的第一張算位移，這樣 x=0 表示在中間份第一張
          animate={{ x: -(index - middleStart) * width }}
          transition={{ type: "tween", duration: immediate ? 0 : 0.35 }}
          style={{ touchAction: "pan-y" }} // 行動裝置更順
        >
          {extended.map(({ i, color }) => (
            <div
              key={i}
              style={{ width }}
              className="slide-wrapper"
              // 每張固定寬度，父層用 translateX 位移
            >
              <Slide color={color} />
            </div>
          ))}
        </motion.div>

        <Dots count={total} active={display} />
      </div>

      <div style={{ height: 700 }} />
    </>
  );
};
