"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface CertificatePreviewProps {
  children: ReactNode;
}

const CERTIFICATE_WIDTH = 794;
const CERTIFICATE_HEIGHT = 1123;
const PREVIEW_PADDING = 32;

export default function CertificatePreview({
  children,
}: CertificatePreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  /*
   * Wait until the component is mounted in the browser.
   *
   * This prevents SSR/Client hydration differences for
   * this browser-dependent preview.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;

    if (!container) return;

    const updateScale = () => {
      const width = container.clientWidth;

      setContainerWidth(width);

      const availableWidth = width - PREVIEW_PADDING * 2;

      const newScale = Math.min(1, availableWidth / CERTIFICATE_WIDTH);

      setScale(Math.max(newScale, 0.1));
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [mounted]);

  /*
   * Server render / first client render.
   *
   * Both render exactly the same thing.
   */
  if (!mounted) {
    return <div className="h-full w-full bg-slate-200" />;
  }

  const scaledWidth = CERTIFICATE_WIDTH * scale;
  const scaledHeight = CERTIFICATE_HEIGHT * scale;

  const shouldCenter = scaledWidth + PREVIEW_PADDING * 2 <= containerWidth;

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-auto bg-slate-200"
    >
      <div
        className="box-border min-h-full min-w-full p-8"
        style={{
          display: "flex",
          justifyContent: shouldCenter ? "center" : "flex-start",
          alignItems: "flex-start",
        }}
      >
        {/* Layout placeholder */}
        <div
          className="relative shrink-0"
          style={{
            width: scaledWidth,
            height: scaledHeight,
          }}
        >
          {/* Actual certificate */}
          <div
            className="absolute left-0 top-0"
            style={{
              width: CERTIFICATE_WIDTH,
              height: CERTIFICATE_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
