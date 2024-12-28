// 적금 src/Page/Saving.jsx
import React, { useState, useEffect } from 'react';
import instance from '../api';

function Saving() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // 오류 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get('', {
          params: {
            q: '',
          },
        });
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div>
      <h1>API 데이터</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default Saving;
