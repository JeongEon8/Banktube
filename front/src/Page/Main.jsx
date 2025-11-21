import React, { useState, useEffect, useCallback } from 'react';
import instance from '../api';
import { useOutletContext } from 'react-router-dom';
import Button from '../components/Button';
import VideoGrid from '../components/VideoGrid';

function Main() {
    const {
        selectedTag,
        handleTagClick,
        setSearchResultText,
        searchResultText,
    } = useOutletContext() || {};
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null); // 오류 관리
    const [hoveredCard, setHoveredCard] = useState(null); // 마우스 오버 상태

    const Duplicates = (list) => {
        const videoMap = new Map();
        list.forEach((video) => {
            if (!videoMap.has(video.id)) {
                videoMap.set(video.id, video);
            }
        });
        return [...videoMap.values()];
    };

    const filledVideo = async (videolist, query) => {
        const remainder = videolist.length % 4;
        if (remainder === 0) return videolist;

        const needed = 4 - remainder;
        let extra = [];
        let nextPageToken = null;
        let attempts = 0;

        while (extra.length < needed && attempts < 5) {
            attempts++;

            const response = await instance.get('/search', {
                params: {
                    q: query,
                    part: 'snippet',
                    maxResults: 5,
                    type: 'video',
                    pageToken: nextPageToken || undefined,
                },
            });
            nextPageToken = response.data.nextPageToken;

            const ids = response.data.items.map((item) => item.id.videoId);
            const videoResponse = await instance.get('/videos', {
                params: {
                    id: ids.join(','),
                    part: 'snippet,contentDetails,statistics',
                },
            });

            const newVideos = videoResponse.data.items.filter(
                (video) =>
                    !videolist.some((v) => v.id === video.id) &&
                    !extra.some((v) => v.id === video.id)
            );
            extra.push(...newVideos);

            if (!nextPageToken) break;
        }
        return [...videolist, ...extra.slice(0, needed)];
    };

    const fetchVideos = async (query) => {
        try {
            const searchResponse = await instance.get('/search', {
                params: {
                    q: query,
                    part: 'snippet',
                    maxResults: 4,
                    type: 'video',
                },
            });

            const videoIds = searchResponse.data.items.map(
                (item) => item.id.videoId
            );

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
    };

    // 비디오 리스트를 가져오는 함수
    const fetchAllVideos = useCallback(async () => {
        try {
            const tags = ['적금', '예금', '대출', '금리'];
            let all = [];

            // 검색어가 없으면 태그별로 영상을 가져오기
            for (const tag of tags) {
                const list = await fetchVideos(tag);
                all.push(...list);
            }

            let unique = Duplicates(all);

            const filled = await filledVideo(unique, '금융');
            setVideos(filled); //return allVideos;
        } catch (err) {
            console.error(err);
            setError(err.message);
            return [];
        }
    }, []);

    const tagVideos = useCallback(async () => {
        try {
            const list = await fetchVideos(selectedTag);
            let unique = Duplicates(list);
            const filled = await filledVideo(unique, selectedTag);
            setVideos(filled);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    }, [selectedTag]);

    const searchVideos = useCallback(async () => {
        try {
            const list = await fetchVideos(searchResultText);
            let unique = Duplicates(list);
            const filled = await filledVideo(unique, searchResultText);
            setVideos(filled);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    }, [searchResultText]);

    // 컴포넌트가 처음 렌더링될 때나 검색어가 바뀔 때마다 호출
    useEffect(() => {
        if (searchResultText?.trim()) {
            searchVideos();
        } else if (selectedTag) {
            tagVideos();
        } else {
            fetchAllVideos();
        }
    }, [
        searchResultText,
        selectedTag,
        fetchAllVideos,
        tagVideos,
        searchVideos,
    ]);

    if (error) {
        return <div>오류 발생: {error}</div>;
    }
    if (videos.length === 0) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <Button
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
                onReset={() => setSearchResultText('')}
            />
            <VideoGrid
                videos={videos}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
            />
        </div>
    );
}

export default Main;
