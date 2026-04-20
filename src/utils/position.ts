/**
 * Generates a random position for a block within the viewport
 * Ensures blocks don't get placed too close to edges
 */
export const getRandomPosition = () => {
  const margin = 150; // Space from edges
  const maxX = window.innerWidth - margin;
  const maxY = window.innerHeight - margin;
  
  return {
    x: Math.random() * (maxX - margin) + margin,
    y: Math.random() * (maxY - margin) + margin,
  };
};
