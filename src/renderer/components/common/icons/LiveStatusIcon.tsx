import React from 'react';

export const StartLiveStatusIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="8" fill="url(#paint0_radial_1230_526)" />
    <circle cx="12" cy="12" r="7.5" stroke="#44FF16" strokeOpacity="0.37" />
    <circle cx="12" cy="12" r="2" fill="#38BA18" />
    <defs>
      <radialGradient
        id="paint0_radial_1230_526"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(12 12) rotate(180) scale(8)"
      >
        <stop stopColor="#38BA18" stopOpacity="0.44" />
        <stop offset="1" stopColor="#44FF16" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const EndLiveStatusIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="8" fill="url(#paint0_radial_1230_2633)" />
    <circle cx="12" cy="12" r="7.5" stroke="#FF4B4B" strokeOpacity="0.37" />
    <circle cx="12" cy="12" r="2" fill="#FF332A" />
    <defs>
      <radialGradient
        id="paint0_radial_1230_2633"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(12 12) rotate(180) scale(8)"
      >
        <stop stopColor="#FF5A53" stopOpacity="0.61" />
        <stop offset="1" stopColor="#FF5A53" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);
