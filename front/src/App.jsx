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
                    <Route path="/main" element={<Main />} />\{' '}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function WithSearch() {
    const [searchResultText, setSearchResultText] = useState(''); // 검색어 상태
    const [selectedTag, setSelectedTag] = useState(null); // 선택된 태그 상태

    const handleTagClick = (tag) => {
        setSearchResultText('');
        setSelectedTag(tag);
    };

    return (
        <>
            <Search
                setSearchResultText={(text) => {
                    setSearchResultText(text);
                    setSelectedTag(null);
                }}
                onReset={() => {
                    setSearchResultText('');
                    setSelectedTag(null);
                }}
            />
            {/* 검색 결과 영상 목록
            {searchResultText.trim() ? (
                <VideoList searchResultText={searchResultText} />
            ) : ( */}
            <Outlet
                context={{
                    setSearchResultText,
                    searchResultText,
                    selectedTag,
                    handleTagClick,
                }}
            />
            {/* )} */}
        </>
    );
}

export default App;
