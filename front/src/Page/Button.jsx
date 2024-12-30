// src/Page/Button.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Botton.css';

function Button({ onReset }) {
  const tags = ['적금', '예금', '대출', '금리']; // 태그 목록
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    console.log(`Fetching videos for: ${tag}`);
    if (tag === '적금') navigate('/saving');
    if (tag === '예금') navigate('/deposit');
    if (tag === '대출') navigate('/loan');
    if (tag === '금리') navigate('/interest-rate');
  };

  useEffect(() => {
    if (onReset) {
      setSelectedTag(null); // 활성화된 상태 초기화
    }
  }, [onReset]);

  return (
    <div className="tag-container">
      {tags.map((tag, index) => (
        <button
          key={index}
          className={`tag ${selectedTag === tag ? 'active' : ''}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default Button;
