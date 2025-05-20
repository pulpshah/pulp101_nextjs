"use client";
import React, { useState, useEffect, ReactNode } from 'react';

interface DraggableWrapperProps {
  children: ReactNode;
}

const DraggableWrapper = ({ children }: DraggableWrapperProps) => {
  const [position, setPosition] = useState({ x: 40, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [alignment, setAlignment] = useState<'left' | 'right'>('left');

  const snapPoints = [
    { x: 40, y: 40, align: 'left' },
    { x: 40, y: 300, align: 'left' },
    { x: 40, y: 560, align: 'left' },
    { x: window.innerWidth - 160, y: 40, align: 'right' },
    { x: window.innerWidth - 160, y: 300, align: 'right' },
    { x: window.innerWidth - 160, y: 560, align: 'right' }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const findNearestPoint = (currentPos: {x: number, y: number}) => {
    const nearest = snapPoints.reduce((nearest, point) => {
      const distance = Math.sqrt(
        Math.pow(point.x - currentPos.x, 2) + 
        Math.pow(point.y - currentPos.y, 2)
      );
      return distance < nearest.distance ? { point, distance } : nearest;
    }, { point: snapPoints[0], distance: Infinity }).point;

    setAlignment(nearest.x < window.innerWidth / 2 ? 'left' : 'right');
    return nearest;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        const nearest = findNearestPoint(position);
        setPosition({ x: nearest.x, y: nearest.y });
      }
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, dragStart]);

  const containerStyle = {
    position: 'fixed' as const,
    top: position.y,
    left: alignment === 'left' ? position.x : 'auto',
    right: alignment === 'right' ? window.innerWidth - position.x : 'auto',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none' as const,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: alignment === 'left' ? 'flex-start' : 'flex-end',
  };

  return (
    <div style={containerStyle} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default DraggableWrapper;