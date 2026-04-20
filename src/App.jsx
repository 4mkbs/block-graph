import { useState, useEffect } from "react";
import Block from "./components/Block";
import ConnectionLine from "./components/ConnectionLine";
import { getRandomPosition } from "./utils/position";

const themeStyles = {
  light: {
    canvas: "bg-gradient-to-br from-rose-100 via-pink-50 to-orange-100",
    header: "bg-white/75 text-slate-800 border border-white/60 shadow-lg",
    toggleButton:
      "bg-slate-900 text-white hover:bg-slate-700 shadow-md shadow-slate-900/20",
    label: "text-slate-700",
    line: "#1f2937",
  },
  dark: {
    canvas: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800",
    header: "bg-slate-900/80 text-slate-100 border border-white/10 shadow-lg",
    toggleButton:
      "bg-amber-300 text-slate-950 hover:bg-amber-200 shadow-md shadow-amber-500/20",
    label: "text-slate-300",
    line: "#e5e7eb",
  },
};

function App() {
  const [blocks, setBlocks] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [theme, setTheme] = useState("light");

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

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("block-graph-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("block-graph-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  // Get connections for rendering lines
  const connections = blocks
    .filter((block) => block.parentId !== null)
    .map((child) => {
      const parent = blocks.find((b) => b.id === child.parentId);
      return parent ? { parent, child } : null;
    })
    .filter(Boolean);

  const currentTheme = themeStyles[theme];

  return (
    <div
      className={`w-full h-screen overflow-hidden relative transition-colors duration-300 ${currentTheme.canvas}`}
    >
      <div
        className={`absolute top-4 right-4 z-20 flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-md ${currentTheme.header}`}
      >
        <span className={`text-sm font-medium ${currentTheme.label}`}>
          {theme === "light" ? "Light mode" : "Dark mode"}
        </span>
        <button
          type="button"
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${currentTheme.toggleButton}`}
          onClick={toggleTheme}
        >
          Toggle theme
        </button>
      </div>

      {/* Render connection lines first (behind blocks) */}
      {connections.map((connection) => (
        <ConnectionLine
          key={`connection-${connection.child.id}`}
          parent={connection.parent}
          child={connection.child}
          stroke={currentTheme.line}
        />
      ))}

      {/* Render blocks */}
      {blocks.map((block) => (
        <Block
          key={block.id}
          block={block}
          onAddChild={handleAddChild}
          onMove={handleMove}
          theme={theme}
        />
      ))}
    </div>
  );
}

export default App;
