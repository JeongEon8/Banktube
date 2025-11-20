import React from 'react';
import '../Style/Video.css';

// 영상 시간 포맷 함수
function VideoCard({ video, hoveredCard, setHoveredCard }) {
    const formatDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = match[1] ? match[1].slice(0, -1).padStart(2, '0') : null;
        const minutes = match[2]
            ? match[2].slice(0, -1).padStart(2, '0')
            : '00';
        const seconds = match[3]
            ? match[3].slice(0, -1).padStart(2, '0')
            : '00';
        return hours
            ? `${hours}:${minutes}:${seconds}`
            : `${minutes}:${seconds}`;
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
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)}분 전`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)}시간 전`;
        if (diffInSeconds < 604800)
            return `${Math.floor(diffInSeconds / 86400)}일 전`;
        return `${Math.floor(diffInSeconds / 604800)}주 전`;
    };

    return (
        <div
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
                        hoveredCard === video.id
                            ? 'active-link'
                            : 'inactive-link'
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
    );
}

export default VideoCard;
