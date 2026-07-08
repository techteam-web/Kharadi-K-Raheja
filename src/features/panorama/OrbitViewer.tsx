import { useCallback, useEffect, useRef, useState } from 'react';

interface OrbitViewerProps {
  /** Public path the frames are served from, e.g. "/orbit-frames" -> /orbit-frames/f000.webp */
  framePath?: string;
  frameCount?: number;
  /** Pixels of horizontal drag per frame step — lower is more sensitive. */
  sensitivity?: number;
  aspectRatio?: string;
  /** Slow idle spin until the first drag/touch, then stops permanently. */
  autoRotate?: boolean;
}

function frameSrc(framePath: string, index: number) {
  return `${framePath}/f${String(index).padStart(3, '0')}.webp`;
}

function wrap(index: number, count: number) {
  return ((index % count) + count) % count;
}

export function OrbitViewer({
  framePath = '/orbit-frames',
  frameCount = 72,
  sensitivity = 6,
  aspectRatio = '16/9',
  autoRotate = false,
}: OrbitViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);
  const hasInteractedRef = useRef(false);
  const autoRotateTimerRef = useRef<number | null>(null);

  const allLoaded = loadedCount >= frameCount;

  // Frame 0 paints as soon as it's in — the rest load in the background afterward,
  // in order, so the loading bar reflects real sequential progress.
  useEffect(() => {
    let cancelled = false;

    const loadFrame = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (cancelled) return resolve();
          if (index === 0) setFirstFrameReady(true);
          setLoadedCount((c) => c + 1);
          resolve();
        };
        // Don't let one broken frame stall the whole sequence.
        img.onerror = () => resolve();
        img.src = frameSrc(framePath, index);
      });

    (async () => {
      await loadFrame(0);
      for (let i = 1; i < frameCount; i++) {
        if (cancelled) return;
        await loadFrame(i);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [framePath, frameCount]);

  useEffect(() => {
    if (!autoRotate || !allLoaded) return;
    autoRotateTimerRef.current = window.setInterval(() => {
      setCurrentFrame((f) => wrap(f + 1, frameCount));
    }, 90);
    return () => {
      if (autoRotateTimerRef.current !== null) window.clearInterval(autoRotateTimerRef.current);
    };
  }, [autoRotate, allLoaded, frameCount]);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const delta = clientX - dragStartX.current;
      const step = Math.round(delta / sensitivity);
      setCurrentFrame(wrap(dragStartFrame.current - step, frameCount));
    },
    [sensitivity, frameCount],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updateFromClientX(e.clientX);
    },
    [updateFromClientX],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      updateFromClientX(e.touches[0].clientX);
    },
    [updateFromClientX],
  );

  // Listeners are attached/removed imperatively (not via a useEffect keyed on state) so
  // there's zero gap between mousedown firing and the window actually listening — a
  // useEffect only runs after React commits the re-render, which is late enough for a
  // fast drag's first move events to be dropped before the listener exists.
  const stopDrag = useCallback(() => {
    setIsDragging(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', stopDrag);
  }, [handleMouseMove, handleTouchMove]);

  // Safety net only — guarantees no leak if the component unmounts mid-drag. The real
  // add/remove lifecycle happens imperatively in startDrag/stopDrag above.
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [handleMouseMove, handleTouchMove, stopDrag]);

  const startDrag = (clientX: number) => {
    if (!allLoaded) return;
    if (!hasInteractedRef.current && autoRotateTimerRef.current !== null) {
      window.clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
    hasInteractedRef.current = true;
    dragStartX.current = clientX;
    dragStartFrame.current = currentFrame;
    setIsDragging(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', stopDrag);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startDrag(e.touches[0].clientX);
  };

  const loadPct = Math.round((loadedCount / frameCount) * 100);
  const angle = Math.round((currentFrame / frameCount) * 360);

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ aspectRatio, cursor: !allLoaded ? 'wait' : isDragging ? 'grabbing' : 'grab' }}
      className="relative h-full w-full select-none overflow-hidden bg-surface"
    >
      {firstFrameReady && (
        <img
          src={frameSrc(framePath, currentFrame)}
          alt="360° view of the building exterior"
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />
      )}

      {!allLoaded && (
        <div className="glass absolute right-3 bottom-3 flex items-center gap-2 rounded-full px-3 py-1.5">
          <div className="h-1 w-16 overflow-hidden rounded-full bg-white/30">
            <div className="h-full bg-blue transition-[width] duration-150" style={{ width: `${loadPct}%` }} />
          </div>
          <span className="label-caps text-ink-muted">{loadPct}%</span>
        </div>
      )}

      <div className="label-caps absolute bottom-3 left-3 text-ink-muted/70">{angle}°</div>
    </div>
  );
}
