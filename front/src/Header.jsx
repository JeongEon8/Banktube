import { FiMenu } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FaKeyboard } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import youtubeLogo from "/img/youtube_logo.png";
import { useState } from "react";

function Header(){
    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    return(
        <header className="header">

            <div className="menu-icon">
                <FiMenu size="24"/>
                <span className="youtube-logo-icon">
                    <img src={youtubeLogo} alt="logo_home" height="22"/>
                </span>
            </div>

            <div className="align-search">
                <div className="search-bar">
                    <form className="search-form">
                        <input type="text" value={search} onChange={onChange} className="search-input" placeholder="검색"/>
                    </form>
                    <FaKeyboard size="20" color="gray" className="search-keyboard"/>
                </div>
                <button type="submit" className="search-btn">
                    <CiSearch size="24"/>
                </button>
            </div>

            <div className="align-mic-btn">
                <button type="button" className="mic-btn">
                    <FaMicrophone size="18"/>
                </button>
            </div>

            <div className="align-row">
                <button type="button" className="creat-btn">
                    <VscAdd/>
                    <p>만들기</p>
                </button>
            </div>
        </header>
    )
}

export default Header