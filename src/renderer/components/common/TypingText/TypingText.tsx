import React, { useState, useEffect } from 'react';

interface ITypingText {
  speed: number;
  msg?: string;
  cb?: () => void;
}

const TypingText: React.FC<ITypingText> = ({ speed, msg, cb }) => {
  const Typer = ({ speed = 250, msg = ' Introduce your text' }) => {
    const [idx, setidx] = useState(0);
    useEffect(() => {
      const timer = window.setInterval(() => {
        if (idx === msg.length) {
          window.clearInterval(timer);
          return;
        }
        setidx((v) => v + 1);
        cb && cb();
      }, speed);
      return () => window.clearInterval(timer);
    });

    return <div>{msg?.substr(0, idx)}</div>;
  };
  return (
    <div>
      <Typer speed={speed} msg={msg}></Typer>
    </div>
  );
};

export default TypingText;
