import React, { useState } from 'react';
import '../Style/Main.css';
import { useNavigate } from 'react-router-dom';
import instance from '../api';

function Main() {
  const tags = ['적금', '예금', '대출', '금리'];
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const fetchVideos = async (tag) => {
    try {
      const response = await instance.get('/search', {
        params: {
          q: tag,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleTagClick = (tag) => {
    console.log(`Fetching videos for: ${tag}`);
    fetchVideos(tag);
    if (tag === '적금') navigate('/saving');
    if (tag === '예금') navigate('/deposit');
    if (tag === '대출') navigate('/loan');
    if (tag === '금리') navigate('/interest-rate');
  };

  return (
    <div>
      <div className="tag-container">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="tag"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="video-container">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id.videoId} className="video-card">
              <h3>{video.snippet.title}</h3>
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
              />
            </div>
          ))
        ) : (
          <p>영상 나와라이야.</p>
        )}
      </div>
    </div>
  );
}

export default Main;
