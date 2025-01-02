// src/Page/Main.js

import React, { useState, useEffect } from 'react';
import '../Style/Page.css';
import instance from '../api';
import { useOutletContext } from 'react-router-dom';
import Button from './Button';

function Main() {
  const { searchResultText = '' } = useOutletContext() || {}; // 기본값 설정
  const tags = ['적금', '예금', '대출', '금리']; // 태그 리스트
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null); // 오류 관리
  const [hoveredCard, setHoveredCard] = useState(null); // 마우스 오버 상태

  const fetchVideos = async (query) => {
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
            id: videoIds.join(','), // 쉼표로 구분된 videoId 리스트
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
  };

  // 비디오 리스트를 가져오는 함수
  const fetchAllVideos = async () => {
    try {
      const allVideos = [];
      if (searchResultText) {
        // 검색어가 있을 경우, 검색어에 맞는 영상만 가져오기
        const searchVideos = await fetchVideos(searchResultText);
        allVideos.push(...searchVideos);
      } else {
        // 검색어가 없으면 태그별로 영상을 가져오기
        for (const tag of tags) {
          const tagVideos = await fetchVideos(tag);
          allVideos.push(...tagVideos);
        }
      }
      setVideos(allVideos);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // 영상 시간 포맷 함수 (예: PT10M25S -> 10:25)
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].slice(0, -1).padStart(2, '0') : null;
    const minutes = match[2] ? match[2].slice(0, -1).padStart(2, '0') : '00';
    const seconds = match[3] ? match[3].slice(0, -1).padStart(2, '0') : '00';

    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  };

  // 조회수 포맷 함수(K, M 단위)
  const formatViewCount = (viewCount) => {
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M회`;
    }
    if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}K회`;
    }
    return `${viewCount}회`;
  };

  // 업로드 시간 포맷 함수
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

  // 컴포넌트가 처음 렌더링될 때나 검색어가 바뀔 때마다 호출
  useEffect(() => {
    fetchAllVideos();
  }, [searchResultText]);

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
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1`} // YouTube embed URL
                  allow="autoplay; encrypted-media"
                  title={video.snippet.title}
                  className="video-frame"
                ></iframe>
              ) : (
                <>
                  <img
                    src={video.snippet.thumbnails.medium.url} // 썸네일
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
                {video.snippet.title} {/* 영상 제목 */}
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

export default Main;
