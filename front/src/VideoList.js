// src/VideoList.js

import React, { useState, useEffect } from 'react';
import api from './api';

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/search', {
          params: {
            q: '금융', // 유튜브 검색어! 여기에 원하는 단어 넣으면 관련 영상 가져옴
          },
        });
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>YouTube Clone</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <img
              src={video.snippet.thumbnails.medium.url} // 썸네일
              alt={video.snippet.title}
            />
            <p>
              {
                video.snippet.title // 영상 제목
              }
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoList;