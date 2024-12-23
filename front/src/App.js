import React, {useState} from 'react';
import VideoList from './VideoList';
import Search from './Search';

function App() {
  const [searchResultText, setSearchResultText] = useState(""); // 검색어 변수 (상태관리)

  return(
    <div>
      <Search setSearchResultText={setSearchResultText}/> 
      <VideoList searchResultText={searchResultText}/>
    </div>
  )
}

export default App;
