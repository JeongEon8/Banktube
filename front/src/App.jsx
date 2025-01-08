import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';
import VideoList from './Page/VideoList';
import Search from './Page/Search';
import Main from './Page/Main';
import Saving from './Page/Saving';
import Deposit from './Page/Deposit';
import Loan from './Page/Loan';
import InterestRate from './Page/Interest_rate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithSearch />}>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/saving" element={<Saving />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/interest-rate" element={<InterestRate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function WithSearch() {
  const [searchResultText, setSearchResultText] = useState(''); // 검색어 상태
  const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태
  const location = useLocation();

  const handleTagReset = () => {
    setSelectedTag(null); // 검색 시 태그를 해제
  };

  useEffect(() => {
    const excludedPaths = [
      '/main',
      '/saving',
      '/deposit',
      '/loan',
      '/interest-rate',
    ];
    if (!excludedPaths.includes(location.pathname)) {
      setSearchResultText('');
      setSelectedTag(null);
    }
  }, [location]);

  return (
    <>
      <Search
        setSearchResultText={(text) => {
          setSearchResultText(text);
          handleTagReset(); // 검색 시 태그 해제
        }}
        onReset={handleTagReset}
      />
      {/* 검색 결과 영상 목록 */}
      <VideoList searchResultText={searchResultText} />
      <Outlet
        context={{
          searchResultText,
          setSearchResultText,
          selectedTag,
          setSelectedTag,
        }}
      />
    </>
  );
}

export default App;
