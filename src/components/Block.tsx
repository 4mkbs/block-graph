import React, { useState, useRef, useEffect } from 'react';
import { Block as BlockType } from '../types';

interface BlockProps {
    block: BlockType;
    onAddChild: (parentId: number) => void;
    onMove: (id: number, x: number, y: number) => void;
}

const Block: React.FC<BlockProps> = ({ block, onAddChild, onMove }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const blockRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        // Don't start dragging if clicking the button
        if ((e.target as HTMLElement).tagName === 'BUTTON') {
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
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset, block.id, onMove]);

    return (
        <div
            ref={blockRef}
            className={`absolute w-32 h-32 bg-pink-600 rounded-lg shadow-lg flex flex-col items-center justify-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
            style={{
                left: `${block.x}px`,
                top: `${block.y}px`,
                transform: 'translate(-50%, -50%)',
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="text-white text-2xl font-bold mb-2">{block.id}</div>
            <button
                className="bg-pink-200 hover:bg-pink-300 text-pink-600 font-bold py-2 px-4 rounded transition-colors"
                onClick={() => onAddChild(block.id)}
            >
                +
            </button>
        </div>
    );
};

export default Block;
