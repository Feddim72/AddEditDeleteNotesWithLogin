import { useEffect, useState, useRef } from "react";

export const useElementSize = <TRef extends Element>() => {
  const ref = useRef<TRef>(null);

  const [size, setSize] = useState({
    width: 0,
    heigth: 0,
    scrollHeigth: 0,
    clientHeigth: 0,
    hasScroll: false,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        if (!entry) {
          return;
        }

        const rect = entry.target.getBoundingClientRect();
        setSize({
          width: rect.width,
          heigth: rect.height,
          scrollHeigth: entry.target.scrollHeight || 0,
          clientHeigth: entry.target.clientHeight || 0,
          hasScroll: entry.target.scrollHeight > entry.target.clientHeight,
        });
      });
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect;
    };
  }, []);

  return { ref, ...size };
};
