import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Style/Botton.css';

function Button({ selectedTag, onReset, onTagClick }) {
  const tags = ['적금', '예금', '대출', '금리']; // 태그 목록
  const navigate = useNavigate();
  const location = useLocation();

  const handleTagClick = (tag) => {
    if (onTagClick) onTagClick(tag);
    switch (tag) {
      case '적금':
        navigate('/saving');
        break;
      case '예금':
        navigate('/deposit');
        break;
      case '대출':
        navigate('/loan');
        break;
      case '금리':
        navigate('/interest-rate');
        break;
      default:
        break;
    }
    if (onReset) onReset(); // 검색어 초기화
  };

  useEffect(() => {
    if (typeof onTagClick === 'function') {
      switch (location.pathname) {
        case '/saving':
          onTagClick('적금');
          break;
        case '/deposit':
          onTagClick('예금');
          break;
        case '/loan':
          onTagClick('대출');
          break;
        case '/interest-rate':
          onTagClick('금리');
          break;
        default:
          onTagClick(null);
          break;
      }
    }
  }, [location.pathname, onTagClick]);

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
