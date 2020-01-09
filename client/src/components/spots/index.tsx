import React from 'react';
import './index.less';

function Spots(props: any) {
  const NUM = 10;
  const sArr: number[] = [];
  for (let i = 0; i < NUM; i++) {
    sArr.push(i);
  }
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 100) + 155;
    const g = Math.floor(Math.random() * 100) + 115;
    const b = Math.floor(Math.random() * 100) + 115;
    return `rgb(${r},${g},${b})`;
  };
  const getRandomWidth = () => {
    return Math.floor(Math.random() * 60);
  };
  const getRandomTop = () => {
    return `${Math.floor(Math.random() * 100)}%`;
  };
  const getRandomMargin = () => {
    return `-${Math.floor(Math.random() * 60)}px`;
  };
  return (
    <div className="spots">
      {sArr.map(k => {
        const radius = getRandomWidth();
        return (
          <span
            key={k}
            className="decorate"
            style={{
              background: getRandomColor(),
              width: radius,
              height: radius,
              marginTop: getRandomMargin(),
              marginLeft: getRandomMargin(),
              top: getRandomTop(),
              left: getRandomTop(),
            }}
          />
        );
      })}
    </div>
  );
}

export default Spots;
