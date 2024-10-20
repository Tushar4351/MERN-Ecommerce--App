import { ReactNode, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

interface ScrollProviderProps {
  children: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    scrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 0.55, // Reduced for smoother scrolling
      lerp: 0.03, // Reduced for smoother interpolation
      getDirection: true,
      getSpeed: true,
      class: "is-revealed",
      reloadOnContextChange: true,
      touchMultiplier: 1.5, // Adjusted for mobile
      smartphone: {
        smooth: true,
        multiplier: 0.55,
        lerp: 0.03,
      },
      tablet: {
        smooth: true,
        multiplier: 0.55,
        lerp: 0.03,
      },
    });

    // Optimize performance with requestAnimationFrame
    const handleResize = () => {
      requestAnimationFrame(() => {
        scrollRef.current?.update();
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Update scroll position periodically
    const updateInterval = setInterval(() => {
      scrollRef.current?.update();
    }, 1000);

    return () => {
      resizeObserver.disconnect();
      clearInterval(updateInterval);
      scrollRef.current?.destroy();
    };
  }, []);

  return (
    <main
      ref={containerRef}
      data-scroll-container
      className="relative min-h-screen w-full overflow-hidden"
    >
      {children}
    </main>
  );
}
