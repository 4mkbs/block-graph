import React, { useState, useRef, useEffect } from "react";
import { Block as BlockType } from "../types";

interface BlockProps {
  block: BlockType;
  onAddChild: (parentId: number) => void;
  onMove: (id: number, x: number, y: number) => void;
  theme: "light" | "dark";
}

const Block: React.FC<BlockProps> = ({ block, onAddChild, onMove, theme }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const blockRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start dragging if clicking the button
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      return;
    }

    setIsDragging(true);
    setOffset({
      x: e.clientX - block.x,
      y: e.clientY - block.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - offset.x;
        const newY = e.clientY - offset.y;
        onMove(block.id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset, block.id, onMove]);

  return (
    <div
      ref={blockRef}
      className={`absolute w-32 h-32 rounded-lg shadow-lg flex flex-col items-center justify-center border transition-colors ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        left: `${block.x}px`,
        top: `${block.y}px`,
        transform: "translate(-50%, -50%)",
        backgroundColor: isDark ? "#f472b6" : "#db2777",
        borderColor: isDark
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.35)",
        boxShadow: isDark
          ? "0 18px 45px rgba(15, 23, 42, 0.45)"
          : "0 18px 45px rgba(190, 24, 93, 0.25)",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="text-white text-2xl font-bold mb-2">{block.id}</div>
      <button
        className={`font-bold py-2 px-4 rounded transition-colors ${
          isDark
            ? "bg-white/90 hover:bg-white text-pink-700"
            : "bg-pink-200 hover:bg-pink-300 text-pink-700"
        }`}
        onClick={() => onAddChild(block.id)}
      >
        +
      </button>
    </div>
  );
};

export default Block;
