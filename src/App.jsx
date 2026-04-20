import React, { useState, useEffect } from "react";
import Block from "./components/Block";
import ConnectionLine from "./components/ConnectionLine";
import { getRandomPosition } from "./utils/position";

function App() {
  const [blocks, setBlocks] = useState([]);
  const [nextId, setNextId] = useState(1);

  // Initialize with the first block
  useEffect(() => {
    const initialPosition = getRandomPosition();
    setBlocks([
      {
        id: 0,
        x: initialPosition.x,
        y: initialPosition.y,
        parentId: null,
      },
    ]);
  }, []);

  const handleAddChild = (parentId) => {
    const newPosition = getRandomPosition();
    const newBlock = {
      id: nextId,
      x: newPosition.x,
      y: newPosition.y,
      parentId: parentId,
    };
    setBlocks([...blocks, newBlock]);
    setNextId(nextId + 1);
  };

  const handleMove = (id, x, y) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  };

  // Get connections for rendering lines
  const connections = blocks
    .filter((block) => block.parentId !== null)
    .map((child) => {
      const parent = blocks.find((b) => b.id === child.parentId);
      return parent ? { parent, child } : null;
    })
    .filter(Boolean);

  return (
    <div className="w-full h-screen bg-pink-100 overflow-hidden relative">
      {/* Render connection lines first (behind blocks) */}
      {connections.map((connection) => (
        <ConnectionLine
          key={`connection-${connection.child.id}`}
          parent={connection.parent}
          child={connection.child}
        />
      ))}

      {/* Render blocks */}
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          onAddChild={handleAddChild}
          onMove={handleMove}
        />
      ))}
    </div>
  );
}

export default App;
