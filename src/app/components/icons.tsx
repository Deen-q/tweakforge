import React from 'react';

interface IconProps {
    className?: string;
    stroke?: string;
}

export const CopyIcon: React.FC<IconProps> = ({ className = "w-4 h-4 inline-block", stroke = "currentColor" }) => (
    <svg
        className={className}
        fill="none"
        stroke={stroke}
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
    </svg>
);

export const UndoIcon: React.FC<IconProps> = ({ className = "w-4 h-4 inline-block", stroke = "currentColor" }) => (
    <svg
        className={className}
        fill="none"
        stroke={stroke}
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
        />
    </svg>
);

export const InspectIcon: React.FC<IconProps> = ({ className = "w-4 h-4 inline-block", stroke = "currentColor" }) => (
    <svg
        className={className}
        fill="none"
        stroke={stroke}
        viewBox="0 0 24 24"
    >
        {/* Magnifying glass circle */}
        <circle cx="11" cy="11" r="8" strokeWidth={2} />
        {/* Plus sign inside the lens */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 8v6m-3-3h6"
        />
        {/* Handle going to bottom-right */}
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35"
        />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-4 h-4 inline-block", stroke = "currentColor" }) => (
    <svg
        className={className}
        fill="none"
        stroke={stroke}
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);