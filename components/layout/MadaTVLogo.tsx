export function MadaTVLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mtv-bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="55%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#c026d3" />
        </linearGradient>
        <radialGradient id="mtv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="44" height="44" rx="13" fill="url(#mtv-bg)" />

      {/* Inner glow */}
      <rect width="44" height="44" rx="13" fill="url(#mtv-glow)" />

      {/* Orbital rings */}
      <g fill="none" stroke="white" strokeWidth="1.6" strokeOpacity="0.8">
        <ellipse cx="22" cy="22" rx="17" ry="6" />
        <ellipse cx="22" cy="22" rx="17" ry="6" transform="rotate(60 22 22)" />
        <ellipse cx="22" cy="22" rx="17" ry="6" transform="rotate(120 22 22)" />
      </g>

      {/* Electron dots on each orbit */}
      <circle cx="39" cy="22" r="2.2" fill="white" />
      <circle cx="14.25" cy="35.1" r="2.2" fill="#f0abfc" />
      <circle cx="14.25" cy="8.9"  r="2.2" fill="#a5f3fc" />

      {/* Nucleus outer glow */}
      <circle cx="22" cy="22" r="5.5" fill="white" fillOpacity="0.2" />
      {/* Nucleus */}
      <circle cx="22" cy="22" r="3.8" fill="white" />
    </svg>
  );
}
