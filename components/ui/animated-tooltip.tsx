"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

export const AnimatedTooltip = ({
  items,
  children,
}: {
  items: {
    id: number;
    name: string;
    designation?: string; // Made optional
    image?: string; // Made optional
  }[];
  children: React.ReactNode;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <div className="relative">
      {items.map((item, idx) => (
        <div
          className="relative group"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: -20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
                top: "100%",
                marginTop: "8px",
              }}
              className="absolute -left-full flex flex-col items-center justify-center text-xs rounded-md bg-accent text-accent-foreground z-50 shadow-xl px-4 py-2"
            >
              <div className="font-medium text-base">{item.name}</div>
              {item.designation && (
                <div className="text-xs">{item.designation}</div>
              )}
            </motion.div>
          )}
          <div onMouseMove={handleMouseMove}>{children}</div>
        </div>
      ))}
    </div>
  );
};
