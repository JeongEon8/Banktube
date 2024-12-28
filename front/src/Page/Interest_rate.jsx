// 금리 src/Page/Interest_rate.jsx

import React, { useState, useEffect } from 'react';
import instance from '../api';
import '../Style/Page.css';

function Interest_rate() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // 오류 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('/search', {
          params: {
            q: '금리',
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
      <h1>금리 영상</h1>
      <div className="container">
        {data.items.map((video) => (
          <div key={video.id.videoId} className="card">
            <img
              src={video.snippet.thumbnails.medium.url} // 썸네일
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3> {/* 영상 제목 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Interest_rate;
