// src/Page/Search.js

import { SlMenu } from 'react-icons/sl';
import { BsFillKeyboardFill } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import logo from '../assets/img/logo.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import '../Style/Search.css';

function Search({ setSearchResultText, onReset }) {
  const [searchText, setSearchText] = React.useState('');
  const navigate = useNavigate();

  const searchInput = (e) => {
    setSearchText(e.target.value); // 입력값에 따라 searchText 상태 갱신
  };

  const handleSearch = () => {
    setSearchResultText(searchText); // 버튼 클릭 시 searchResultText를 searchText로 갱신
    onReset();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchResultText(searchText); // 엔터키시 searchResultText를 searchText로 갱신
      onReset();
    }
  };

  const logoPress = () => {
    setSearchResultText(''); // 기존 검색 결과 초기화
    onReset();
    navigate('/main'); // main 페이지로 이동
  };

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
          <button className="search-bar-keyboard">
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
