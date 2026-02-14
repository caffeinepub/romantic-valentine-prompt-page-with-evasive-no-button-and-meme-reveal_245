import { useState, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseEvasiveButtonOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  buttonRef: React.RefObject<HTMLElement | null>;
}

export function useEvasiveButton({ containerRef, buttonRef }: UseEvasiveButtonOptions) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const isMovingRef = useRef(false);

  const moveButton = useCallback(() => {
    if (isMovingRef.current || !buttonRef.current || !containerRef.current) return;
    
    isMovingRef.current = true;

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();

    // Calculate safe bounds to keep button fully visible within container
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    const minX = 20;
    const minY = 20;

    // Generate random position within safe bounds
    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    setPosition({ x: newX, y: newY });

    // Reset moving flag after animation completes
    setTimeout(() => {
      isMovingRef.current = false;
    }, 300);
  }, [buttonRef, containerRef]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    moveButton();
  }, [moveButton]);

  const handlePointerEnter = useCallback(() => {
    moveButton();
  }, [moveButton]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    moveButton();
  }, [moveButton]);

  return {
    position,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerEnter: handlePointerEnter,
      onTouchStart: handleTouchStart,
    },
  };
}
