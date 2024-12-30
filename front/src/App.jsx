import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import VideoList from './Page/VideoList';
import Search from './Page/Search';
import Button from './Page/Button';
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
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset((prev) => !prev); // Reset 상태 토글
  };

  // 상태 변경 감지 및 초기화
  React.useEffect(() => {
    if (reset) {
      setReset(false); // Reset 상태 -> false로 되돌림
    }
  }, [reset]);

  return (
    <>
      <Search
        setSearchResultText={setSearchResultText}
        onReset={handleReset} // Reset 함수 전달
      />
      {/* 검색 결과 영상 목록 */}
      <VideoList searchResultText={searchResultText} />
      <Button onReset={reset} />
      <Outlet />
    </>
  );
}

export default App;
