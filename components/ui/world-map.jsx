"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

export default function WorldMap({
  dots = [],
  lineColor = "#14b8a6",
  className = "",
}) {
  const svgRef = useRef(null);
  
  const map = useMemo(() => {
    const mapInstance = new DottedMap({ height: 100, grid: "diagonal" });
    return mapInstance;
  }, []);
  
  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.22,
      color: "#cbd5e1",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [map]);

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className={`w-full aspect-[2/1] ${className}`}>
      <div
        ref={svgRef}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] pointer-events-none select-none"
      >
        <svg
          viewBox="0 0 800 400"
          className="h-full w-full"
          dangerouslySetInnerHTML={{ __html: svgMap }}
        />
        <svg
          viewBox="0 0 800 400"
          className="h-full w-full absolute inset-0"
        >
          {dots.map((dot, i) => {
            const point = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = dot.end ? projectPoint(dot.end.lat, dot.end.lng) : null;

            return (
              <g key={`dot-group-${i}`}>
                {/* Starting dot */}
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={lineColor}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill={lineColor}
                  opacity="0.3"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />

                {/* Connection line and end dot */}
                {endPoint && (
                  <>
                    <motion.path
                      d={createCurvedPath(point, endPoint)}
                      fill="none"
                      stroke={lineColor}
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    />
                    <motion.circle
                      cx={endPoint.x}
                      cy={endPoint.y}
                      r="4"
                      fill={lineColor}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
