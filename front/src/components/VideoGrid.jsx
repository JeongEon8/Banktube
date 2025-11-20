import React from 'react';
import VideoCard from './VideoCard';
import '../Style/Video.css';

function VideoGrid({ videos, hoveredCard, setHoveredCard }) {
    if (!videos || videos.length === 0) {
        return <div>로딩 중 ...</div>;
    }

    return (
        <div className="container">
            {videos.map((video, index) => (
                <VideoCard
                    key={`${video.id}-${index}`}
                    video={video}
                    hoveredCard={hoveredCard}
                    setHoveredCard={setHoveredCard}
                />
            ))}
        </div>
    );
}

export default VideoGrid;
