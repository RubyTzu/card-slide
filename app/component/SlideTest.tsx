"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";

const Dots = ({ count, active }: { count: number; active: number }) => {
  return (
    <div className="flex flex-row justify-center relative bottom-5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i} className="w-[6px] h-[6px] bg-white rounded opacity-80 mr-[10px] last:mr-0" animate={{ scale: active === i ? 1.5 : 1, opacity: active === i ? 1 : 0.5 }} />
      ))}
    </div>
  );
};

const Slide = ({ color }: { color: string }) => <div style={{ backgroundColor: color }} className="min-w-full h-full" />;

export const SlideTest = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const colors = ["blue", "green", "orange"]; // 真實幻燈片
  const count = colors.length;

  // 擴展：頭尾各 clone 一張 => [cloneLast, ...real, cloneFirst]
  const extended = [colors[count - 1], ...colors, colors[0]];

  // index 從 1 開始（指向第一張真實圖）
  const [idx, setIdx] = useState(1);
  const [width, setWidth] = useState(0);
  const [instant, setInstant] = useState(false); // 用來在「偷換」位置時關閉動畫

  // 監測容器寬度（支援 RWD）
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 拖曳結束決定是否翻頁（往右 dir=+1，往左 dir=-1）
  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = Math.max(40, width * 0.15);
    const offset = info.offset.x;
    if (Math.abs(offset) > threshold) {
      const dir = offset < 0 ? 1 : -1; // 左拖＝下一張；右拖＝上一張
      setIdx((p) => p + dir);
    }
  };

  // 動畫完成後，若落在 clone，就瞬間「偷換」到對應的真實位置
  const onAnimationComplete = () => {
    if (idx === 0) {
      // 從最左的 cloneLast 回跳到最後一張真實圖
      setInstant(true);
      setIdx(count);
      // 下一個事件迴圈再把 instant 關掉，避免看到 0s 動畫
      requestAnimationFrame(() => setInstant(false));
    } else if (idx === count + 1) {
      // 從最右的 cloneFirst 回跳到第一張真實圖
      setInstant(true);
      setIdx(1);
      requestAnimationFrame(() => setInstant(false));
    }
  };

  // 指示器顯示目前真實索引
  const realActive = (idx - 1 + count) % count;

  return (
    <>
      <div className="relative overflow-hidden w-[50vw] h-[250px]" ref={containerRef}>
        <motion.div
          className="flex w-full h-full flex-row"
          drag="x"
          dragElastic={0.08}
          dragMomentum={false}
          // 注意：因為有頭尾 clone，所以可拖曳的範圍是 -(count+1)*width ~ 0
          dragConstraints={{ left: -(count + 1) * width, right: 0 }}
          onDragEnd={onDragEnd}
          animate={{ x: -idx * width }}
          transition={
            instant
              ? { duration: 0 } // 偷換座標時 0 秒
              : { type: "spring", stiffness: 300, damping: 35 } // 平常用彈簧
          }
          onAnimationComplete={onAnimationComplete}>
          {extended.map((c, i) => (
            <Slide key={`${c}-${i}`} color={c} />
          ))}
        </motion.div>

        <Dots count={count} active={realActive} />
      </div>
    </>
  );
};
