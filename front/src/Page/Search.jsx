// src/Page/Search.js

import { SlMenu } from 'react-icons/sl';
import { BsFillKeyboardFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import logo from '../assets/img/logo.png';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Style/Search.css';

function Search({ setSearchResultText, onReset }) {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const searchInput = (e) => {
    setSearchText(e.target.value); // 입력값에 따라 searchText 상태 갱신
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchResultText(searchText.trim()); // 검색 결과 상태 갱신
      if (onReset) onReset();
    }
  };

  // Enter 키 입력 시 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      setSearchResultText(searchText.trim()); // 검색 결과 상태 갱신
      if (onReset) onReset();
    }
  };

  const logoPress = () => {
    setSearchResultText(''); // 기존 검색 결과 초기화
    if (onReset) onReset();
    navigate('/main'); // main 페이지로 이동
  };

  // 라우팅 변경 시 검색창 초기화
  useEffect(() => {
    setSearchText(''); // 검색창을 초기화
  }, [location]);

  return (
    <div className="search-header">
      <div className="header-left">
        <button className="hamburger-btn">
          <SlMenu size="17" />
        </button>
        <span className="logo" onClick={logoPress}>
          <img src={logo} alt="BankTube" height="20" />
        </span>
      </div>
      <div className="header-middle">
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색"
            className="search-bar-input"
            onChange={searchInput}
            onKeyDown={handleKeyPress}
            value={searchText}
          />
          <button className="search-bar-keyboard" onClick={handleSearch}>
            <BsFillKeyboardFill color="gray" size="21" />
          </button>
        </div>
        <button className="search-bar-button" onClick={handleSearch}>
          <CiSearch size="24" />
        </button>
      </div>
    </div>
  );
}

export default Search;
