"use client";

import { useRef, useState, type PointerEvent } from "react";

interface Position {
  x: number;
  y: number;
}

export function DraggableNoteCardPreview() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 });

  function handlePointerDown(event: PointerEvent<HTMLDivElement>): void {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      posX: position.x,
      posY: position.y,
    };
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    if (!dragging) {
      return;
    }
    setPosition({
      x: dragStart.current.posX + (event.clientX - dragStart.current.pointerX),
      y: dragStart.current.posY + (event.clientY - dragStart.current.pointerY),
    });
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>): void {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  }

  return (
    <div className="relative h-full min-h-[220px] w-full touch-none">
      <div
        role="presentation"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className={`w-56 select-none rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 shadow-xl backdrop-blur-sm touch-none ${
          dragging ? "cursor-grabbing ring-2 ring-amber-400/50" : "cursor-grab"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Not</p>
        <p className="mt-2 text-sm text-zinc-200">Beni önizleme alanında sürükleyin.</p>
      </div>
    </div>
  );
}
