import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Style/Botton.css';

function Button({ selectedTag, onReset, onTagClick }) {
    const tags = ['적금', '예금', '대출', '금리'];

    const handleTagClick = (tag) => {
        if (onReset) onReset();
        if (onTagClick) onTagClick(tag);
    };

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
