import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';

/*
あるurlからgetでデータ取得して表示しろ。
inputとbuttonとdivがある。inputから取得したキーワードでbutton押したあとgetが走るように。
ajaxはaxios、jQueryなど方法は問わない。
*/

export const Hoge: React.FC = () => {
  const [temp, setTemp] = useState([]);
  const [lat, setLat] = useState(0);

  const clickHandler = useCallback(() => {
    if (!lat || lat < 0 || lat > 90) return;

    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=139.6823&hourly=temperature_2m&timezone=Asia%2FTokyo`
      )
      .then((response) => {
        setTemp(response.data.hourly.temperature_2m);
      });
  }, [lat]);

  return (
    <>
      <p>hoge3</p>
      lat:
      <input
        type="number"
        min="0"
        max="90"
        onChange={(e) => {
          setLat(e.target.value);
        }}
      />
      <button onClick={clickHandler}>温度調べる</button>
      <p>この緯度の温度：{temp?.[0]}</p>
    </>
  );
};
