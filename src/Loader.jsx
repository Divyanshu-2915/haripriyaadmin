import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      waveRef.current,
      { y: 150 },
      { y: 0, duration: 2.5, ease: 'power2.inOut' }
    );
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[#56021F]">
      <svg
        viewBox="0 0 800 200"
        width="800"
        height="200"
        style={{ display: 'block' }}
      >
        <defs>
          <clipPath id="text-clip">
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fontSize="100"
              fontWeight="bold"
              fontFamily="'Bebas Neue', sans-serif"
              dominantBaseline="middle"
            >
              जय श्री कृष्णा
            </text>
          </clipPath>
        </defs>
        {/* Faint background text */}
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="100"
          fontWeight="bold"
          fontFamily="'Bebas Neue', sans-serif"
          fill="white"
          opacity="0.1"
          dominantBaseline="middle"
        >
          जय श्री कृष्णा
        </text>
        {/* Animated wave fill */}
        <g clipPath="url(#text-clip)">
          <g ref={waveRef}>
            <path
              d="
                M0,200
                Q200,150 400,200
                T800,200
                V0
                H0
                Z
              "
              fill="white"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
