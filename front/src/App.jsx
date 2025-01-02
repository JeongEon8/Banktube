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
  const [searchResultText, setSearchResultText] = useState(''); // 검색어 변수 (상태관리)
  const location = useLocation();

  // 라우팅 변경 시 검색 결과 초기화
  useEffect(() => {
    setSearchResultText(''); // 검색어 상태 초기화
  }, [location]);

  return (
    <>
      <Search setSearchResultText={setSearchResultText} />
      {/* 검색 결과 영상 목록 */}
      <VideoList searchResultText={searchResultText} />
      <Outlet context={{ searchResultText }} /> {/* context 전달 */}
    </>
  );
}

export default App;
