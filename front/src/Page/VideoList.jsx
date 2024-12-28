// src/Page/VideoList.js

import React, { useState, useEffect } from 'react';
import api from '../api';

function VideoList({ searchResultText }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (searchResultText.trim() === '') return; // 검색어가 비어있으면 호출하지 않음

      try {
        const response = await api.get('/search', {
          params: {
            q: searchResultText, // 유튜브 검색어! 여기에 원하는 단어 넣으면 관련 영상 가져옴
          },
        });
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [searchResultText]);

  return (
    <div>
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
