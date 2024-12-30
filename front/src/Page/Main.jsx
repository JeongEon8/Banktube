// src/Page/Main.jsx
import React, { useState, useEffect } from 'react';
import '../Style/Page.css';
import instance from '../api';

function Main() {
  const tags = ['적금', '예금', '대출', '금리']; // 태그 리스트
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null); // 오류 관리
  const [hoveredCard, setHoveredCard] = useState(null); // 마우스 오버 상태

  const fetchAllVideos = async () => {
    try {
      const allVideos = [];
      for (const tag of tags) {
        const response = await instance.get('/search', {
          params: {
            q: tag,
          },
        });
        allVideos.push(...response.data.items);
      }
      setVideos(allVideos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('영상을 불러오는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchAllVideos(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  if (videos.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div className="container">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="card"
            onMouseEnter={() => setHoveredCard(video.id.videoId)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="thumbnail-container">
              {hoveredCard === video.id.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&mute=1`} // YouTube embed URL
                  allow="autoplay; encrypted-media"
                  title={video.snippet.title}
                  className="video-frame"
                ></iframe>
              ) : (
                <img
                  src={video.snippet.thumbnails.medium.url} // 썸네일
                  alt={video.snippet.title}
                  className="thumbnail"
                />
              )}
            </div>
            <h3>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  hoveredCard === video.id.videoId
                    ? 'active-link'
                    : 'inactive-link'
                }
              >
                {video.snippet.title}
              </a>
            </h3>
            {/* 영상 제목 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
