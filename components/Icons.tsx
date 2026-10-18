// Small line icons that share one size and stroke, so buttons match.
const base = {
  width: 12,
  height: 12,
  viewBox: "0 0 12 12",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowUpRight = () => (
  <svg {...base}>
    <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
  </svg>
);

export const Play = () => (
  <svg {...base}>
    <path d="M4 2.8v6.4L9 6z" />
  </svg>
);
