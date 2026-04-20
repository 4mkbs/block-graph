import React from "react";
import { Block } from "../types";

interface ConnectionLineProps {
  parent: Block;
  child: Block;
  stroke: string;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  parent,
  child,
  stroke,
}) => {
  // Calculate the line coordinates
  const x1 = parent.x;
  const y1 = parent.y;
  const x2 = child.x;
  const y2 = child.y;

  // Calculate the bounding box for the SVG
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const maxX = Math.max(x1, x2);
  const maxY = Math.max(y1, y2);

  const width = maxX - minX;
  const height = maxY - minY;

  // Adjust coordinates relative to SVG viewport
  const relX1 = x1 - minX;
  const relY1 = y1 - minY;
  const relX2 = x2 - minX;
  const relY2 = y2 - minY;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: `${minX}px`,
        top: `${minY}px`,
        width: `${width}px`,
        height: `${height}px`,
        overflow: "visible",
      }}
    >
      <line
        x1={relX1}
        y1={relY1}
        x2={relX2}
        y2={relY2}
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    </svg>
  );
};

export default ConnectionLine;
