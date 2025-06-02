// src/components/Logo.tsx
import React from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** 
   * Change these values to crop the visible region.
   * cropX, cropY = top-left corner of the crop rectangle (in SVG user units)
   * cropW, cropH = width/height of the crop rectangle
   */
  cropX?: number;
  cropY?: number;
  cropW?: number;
  cropH?: number;
}

const Logo: React.FC<LogoProps> = ({
  cropX = 90,
  cropY = 250,
  cropW = 560,
  cropH = 240,
  width,
  height,
  ...svgProps
}) => {
  // If you don’t pass width/height props, the SVG will scale to cropW × cropH
  const w = width ?? cropW;
  const h = height ?? cropH;

  return (
    <svg
      // viewBox is shifted & sized to your crop rectangle
      viewBox={`${cropX} ${cropY} ${cropW} ${cropH}`}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      {/* ───────────────
          Full LKRM mark paths below
          ─────────────── */}
      <path d="M171.4,288.1v139.1h27.5V462h-72.7V288.1z" />
      <path d="M317.6,288.1l-25.9,78.5l28.4,95.4h-46.7L255,387.5V462h-45.2V288.1H255v67.6l20.1-67.6H317.6z" />
      <path d="M327.9,288.1h32c21.3,0,35.8,0.8,43.3,2.5s13.7,5.9,18.5,12.6c4.8,6.8,7.1,17.6,7.1,32.4c0,13.5-1.7,22.6-5,27.3
        s-10,7.5-19.9,8.4c9,2.2,15,5.2,18,8.9c3.1,3.7,5,7.1,5.8,10.3s1.1,11.7,1.1,25.7v45.9h-42v-57.8c0-9.3-0.7-15.1-2.2-17.3
        c-1.5-2.2-5.3-3.3-11.5-3.3v78.4h-45.2zM373.1,317.9v38.7c5.1,0,8.6-0.7,10.7-2.1s3.1-5.9,3.1-13.6v-9.6c0-5.5-1-9.1-3-10.9
        C381.9,318.7,378.3,317.9,373.1,317.9z" />
      <path d="M546.4,429.8v6h39.5v-6H546.4z M546.4,462h39.5v-7.3h-39.5V462z M546.4,442.3v6h39.5v-6H546.4z
        M527.1,288.1l-10.4,81.2l-6.4-44.2c-1.9-14.2-3.6-26.5-5.4-37h-58.5V462h39.5l0.1-114.7L502.5,462h28l15.7-117.4l0,78.7h39.5
        V288.1H527.1z" />
    </svg>
  );
};

export default Logo;
