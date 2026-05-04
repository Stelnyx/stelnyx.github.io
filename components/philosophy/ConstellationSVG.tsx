export function ConstellationSVG() {
  const dots: [number, number][] = [
    [60, 40],
    [160, 80],
    [240, 30],
    [300, 120],
    [200, 180],
    [80, 200],
    [350, 220],
    [140, 270],
    [280, 270],
    [380, 80],
  ];

  const lines: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [1, 4],
    [3, 9],
    [4, 7],
    [6, 8],
    [7, 8],
    [5, 7],
  ];

  const delays = [0, 0.5, 1.0, 1.5, 0.8, 1.2, 0.3, 1.8, 0.6, 2.0];

  return (
    <svg
      viewBox="0 0 420 310"
      width="100%"
      height="100%"
      aria-hidden="true"
      className="max-w-[400px] w-full"
    >
      {/* Lines */}
      {lines.map(([a, b], i) => (
        <line
          key={i}
          x1={dots[a][0]}
          y1={dots[a][1]}
          x2={dots[b][0]}
          y2={dots[b][1]}
          stroke="#1E1E3A"
          strokeWidth="1"
          strokeOpacity="0.8"
        />
      ))}

      {/* Dots */}
      {dots.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill="#6C63FF"
          className="pulse-dot"
          style={{ animationDelay: `${delays[i]}s` }}
        />
      ))}
    </svg>
  );
}
