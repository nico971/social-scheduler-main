// components/Calendar.tsx
import React, { useState } from 'react';
import PostModal from './PostModal';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Array<{ platform: string; date: string }>>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handleAddPost = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleSavePost = (date: string) => {
    setEvents((prev) => [...prev, { platform: selectedPlatform!, date }]);
    setSelectedPlatform(null);
  };

  return (
    <div style={{ padding: '10px', border: '1px solid gray', minHeight: '300px' }}>
      <h3>Calendar</h3>
      <ul>
        {events.map((event, idx) => (
          <li key={idx}>
            {event.platform} scheduled on {event.date}
          </li>
        ))}
      </ul>

      {selectedPlatform && (
        <PostModal
          platform={selectedPlatform}
          onSave={handleSavePost}
          onClose={() => setSelectedPlatform(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
