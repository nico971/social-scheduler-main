// components/PostSchedulerWrapper.tsx
"use client"
import React, { useState } from 'react';
import PlatformCard from './PlatformCard';
import Calendar from './Calendar';
import PostModal from './PostModal';

const PostSchedulerWrapper: React.FC = () => {
  const platforms = [
    { platform: 'TikTok', color: '#69C9D0' },
    { platform: 'Instagram', color: '#E1306C' },
    { platform: 'LinkedIn', color: '#0077B5' },
  ];

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Open modal when a platform is selected
  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlatform(null);
  };

  // Save post (this would usually involve more logic, like saving to a database)
  const handleSavePost = (date: string) => {
    // Implement your save logic here (like calling an API)
    console.log(`Saving post for ${selectedPlatform} on ${date}`);
    handleCloseModal();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
      <div style={{ width: '30%', padding: '10px' }}>
        <h3>Select Platform</h3>
        {platforms.map((platform, idx) => (
          <PlatformCard
            key={idx}
            platform={platform.platform}
            color={platform.color}
            onSelect={handleSelectPlatform}
          />
        ))}
      </div>

      <div style={{ width: '70%', padding: '10px' }}>
        <Calendar />
      </div>

      {isModalOpen && selectedPlatform && (
        <PostModal platform={selectedPlatform} onSave={handleSavePost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PostSchedulerWrapper;
