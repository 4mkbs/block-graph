# Block Graph

Block Graph is a lightweight React app for building and exploring a simple node graph on a free-form canvas. Each block can be dragged around, and new child blocks can be added directly from any existing block.

## Overview

The app starts with a single root block placed at a random position inside the viewport. From there, you can:

- Drag blocks to reposition them anywhere on the screen
- Add child blocks using the `+` button inside a block
- See parent-child relationships rendered as dashed connector lines

The layout is intentionally minimal so the graph itself stays the focus.

## Features

- Full-screen graph canvas
- Draggable blocks with live position updates
- Parent-child block creation
- Dashed connection lines between related blocks
- Randomized initial placement to avoid overlap near the edges

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173/
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Lint the Project

```bash
npm run lint
```

## Project Structure

- `src/App.jsx` - main graph state and rendering logic
- `src/components/Block.tsx` - draggable block UI and child creation button
- `src/components/ConnectionLine.tsx` - dashed SVG line between parent and child blocks
- `src/utils/position.ts` - random block position helper
- `src/index.css` - Tailwind entry styles

## Notes

- Blocks are positioned using viewport coordinates, so resizing the browser may change how the canvas feels.
- Connection lines are drawn between block centers based on their current positions.
