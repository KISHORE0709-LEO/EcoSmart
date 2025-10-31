import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export const CursorSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let sparkleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle: Sparkle = {
        id: sparkleId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      };

      setSparkles(prev => [...prev, newSparkle]);

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
          style={{
            left: sparkle.x - 4,
            top: sparkle.y - 4,
            opacity: sparkle.opacity,
          }}
        />
      ))}
    </div>
  );
};