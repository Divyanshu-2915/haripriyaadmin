import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TextFill = () => {
  const fillRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      fillRef.current,
      { y: '100%' },
      {
        y: '0%',
        duration: 10,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[#56021F]">
      <svg
        viewBox="0 0 1000 300"
        className="w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Define white fill in a mask */}
        <defs>
          <clipPath id="text-clip">
            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              className="font-[Bebas Neue]"
              fontSize="180"
              fontWeight="700"
            >
              HARIPRIYA
            </text>
          </clipPath>
        </defs>

        {/* Background Text (outline or empty) */}
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          fontSize="180"
          fontWeight="700"
          fill="white"
          opacity="0.1"
          className="font-[Bebas Neue]"
        >
          HARIPRIYA
        </text>

        {/* White fill inside text via clipPath */}
        <g clipPath="url(#text-clip)">
          <rect
            ref={fillRef}
            x="0"
            y="0"
            width="1000"
            height="300"
            fill="white"
            transform="translate(500, 900)"
          />
        </g>
      </svg>
    </div>
  );
};

export default TextFill;
