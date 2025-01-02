// 적금: src/Page/Saving.js

import React, { useState, useEffect, useCallback } from 'react';
import instance from '../api';
import '../Style/Page.css';
import Button from './Button';
import { useOutletContext } from 'react-router-dom';

function Saving() {
  const { searchResultText = '' } = useOutletContext() || {};
  const [videos, setVideos] = useState([]); // 영상 데이터 저장
  const [error, setError] = useState(null); // 오류 관리
  const [hoveredCard, setHoveredCard] = useState(null); // 마우스 오버 상태 관리

  const fetchVideos = useCallback(async (query) => {
    try {
      const searchResponse = await instance.get('/search', {
        params: {
          q: query,
          part: 'snippet',
          maxResults: 1,
          type: 'video',
        },
      });

      const videoIds = searchResponse.data.items.map((item) => item.id.videoId);

      // 상세 정보 가져오기
      if (videoIds.length > 0) {
        const videoResponse = await instance.get('/videos', {
          params: {
            id: videoIds.join(','),
            part: 'snippet,contentDetails,statistics',
          },
        });

        return videoResponse.data.items;
      }
      return [];
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.message);
      return [];
    }
  }, []);

  const fetchSavingVideos = useCallback(async () => {
    try {
      let videosData = [];
      if (searchResultText.trim() === '') {
        // 검색어가 없을 경우 기본 '적금' 태그로 영상 가져오기
        videosData = await fetchVideos('적금');
      } else {
        // 검색어가 있을 경우 해당 검색어로 검색
        videosData = await fetchVideos(searchResultText.trim());
      }
      setVideos(videosData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }, [searchResultText, fetchVideos]);

  useEffect(() => {
    fetchSavingVideos();
  }, [fetchSavingVideos]);

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].slice(0, -1).padStart(2, '0') : null;
    const minutes = match[2] ? match[2].slice(0, -1).padStart(2, '0') : '00';
    const seconds = match[3] ? match[3].slice(0, -1).padStart(2, '0') : '00';

    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  };

  const formatViewCount = (viewCount) => {
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M회`;
    }
    if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}K회`;
    }
    return `${viewCount}회`;
  };

  const calculateTimeAgo = (publishedAt) => {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}일 전`;
    return `${Math.floor(diffInSeconds / 604800)}주 전`;
  };

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  if (videos.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Button />
      <div className="container">
        {videos.map((video) => (
          <div
            key={video.id}
            className="card"
            onMouseEnter={() => setHoveredCard(video.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="thumbnail-container">
              {hoveredCard === video.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1`}
                  allow="autoplay; encrypted-media"
                  title={video.snippet.title}
                  className="video-frame"
                ></iframe>
              ) : (
                <>
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="thumbnail"
                  />
                  <div className="video-duration">
                    {formatDuration(video.contentDetails.duration)}
                  </div>
                </>
              )}
            </div>
            <h3>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  hoveredCard === video.id ? 'active-link' : 'inactive-link'
                }
              >
                {video.snippet.title}
              </a>
            </h3>
            <p className="video-info">
              채널명: {video.snippet.channelTitle}
              <br />
              조회수 {formatViewCount(video.statistics.viewCount)} ·{' '}
              {calculateTimeAgo(video.snippet.publishedAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Saving;
