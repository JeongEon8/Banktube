// 예금 src/Page/Deposit.jsx

import React, { useState, useEffect } from 'react';
import instance from '../api';
import '../Style/Page.css';

function Deposit() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // 오류 관리
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/search', {
          params: {
            q: '예금',
          },
        });
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div className="container">
        {data.items.map((video) => (
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
                href={
                  hoveredCard === video.id.videoId
                    ? `https://www.youtube.com/watch?v=${video.id.videoId}`
                    : undefined
                } // 마우스 오버 시에만만 URL 활성화
                target={hoveredCard === video.id.videoId ? '_blank' : undefined}
                rel={
                  hoveredCard === video.id.videoId
                    ? 'noopener noreferrer'
                    : undefined
                }
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

export default Deposit;
