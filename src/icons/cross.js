import React from 'react';

const crossIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_b_45_427)">
            <path d="M12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5L12 10.59Z" fill="#101D46"/>
        </g>
        <defs>
            <filter id="filter0_b_45_427" x="-5" y="-5" width="34" height="34" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_45_427"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_45_427" result="shape"/>
            </filter>
        </defs>
    </svg>
);

export default crossIcon;
