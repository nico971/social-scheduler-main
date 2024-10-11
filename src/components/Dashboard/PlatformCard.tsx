// components/PlatformCard.tsx
import React from 'react';

interface PlatformCardProps {
  platform: string;
  color: string;
  onSelect: (platform: string) => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, color, onSelect }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        cursor: 'pointer',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        color: 'white',
      }}
      onClick={() => onSelect(platform)}
    >
      {platform}
    </div>
  );
};

export default PlatformCard;
