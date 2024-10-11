// components/PostModal.tsx
import React, { useState } from 'react';

interface PostModalProps {
  platform: string;
  onSave: (date: string) => void;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ platform, onSave, onClose }) => {
  const [date, setDate] = useState<string>('');

  const handleSave = () => {
    onSave(date);
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '30%', background: 'white', padding: '20px', zIndex: 1000 }}>
      <h3>Create Post for {platform}</h3>
      <label>
        Select Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PostModal;
