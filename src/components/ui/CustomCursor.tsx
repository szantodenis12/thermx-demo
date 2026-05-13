"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const checkPointer = () => {
      const hoveredElement = document.querySelector(":hover");
      if (hoveredElement) {
        const style = window.getComputedStyle(hoveredElement);
        setIsPointer(style.cursor === "pointer");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", checkPointer);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkPointer);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Outer scanner ring */}
      <motion.div
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 80 : 40,
          height: isPointer ? 80 : 40,
          borderColor: isPointer ? "rgba(255, 69, 0, 0.5)" : "rgba(255, 255, 255, 0.2)",
        }}
        className="rounded-full border-[1px] absolute flex items-center justify-center transition-colors duration-500"
      >
        {/* Inner thermal dot */}
        <motion.div 
          animate={{
            scale: isPointer ? 1.5 : 1,
            backgroundColor: isPointer ? "#FF4500" : "#FFF",
          }}
          className="w-1.5 h-1.5 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.5)]" 
        />
        
        {/* Crosshair lines (visible on pointer) */}
        {isPointer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-2 bg-thermal-orange/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-2 bg-thermal-orange/50" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-2 bg-thermal-orange/50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-2 bg-thermal-orange/50" />
          </motion.div>
        )}
      </motion.div>
      
      {/* Dynamic Glow (Thermal Signature) */}
      <motion.div
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isPointer ? 0.4 : 0,
          scale: isPointer ? 1.2 : 0.8,
        }}
        className="absolute w-32 h-32 bg-thermal-orange/20 rounded-full blur-[40px]"
      />
    </div>
  );
}
