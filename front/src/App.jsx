import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Search from './Page/Search';
import Main from './Page/Main';

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
            <Outlet
                context={{
                    setSearchResultText,
                    searchResultText,
                    selectedTag,
                    handleTagClick,
                }}
            />
        </>
    );
}

export default App;
