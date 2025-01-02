// src/api.js

import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // api-key 보안

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet,contentDetails,statistics', // 유튜브 영상, 채널, 재생목록 가져옴
    maxResults: 1, // 일단 1개 가져오는 걸로 개수 한정해놓음
    key: API_KEY,
  },
});

export default instance;
