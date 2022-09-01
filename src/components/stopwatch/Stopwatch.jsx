import { useState, useEffect } from "react";
import "./stopwatch.css";

export default function Stopwatch() {
  const [isOpen, setIsOpen] = useState(false);
  const [second, setSecond] = useState(0);
  const [run, setRun] = useState(false);
  const [count, setCount] = useState([]);
  const [total, setTotal] = useState([]);
  const [showResult, setShowResult] = useState(false);

  function start() {
    setRun(true);
  }

  function pause() {
    setRun(!run);
  }

  function reset() {
    setSecond(0);
    setRun(false);
  }

  useEffect(() => {
    let interval = null;
    if (run) {
      interval = setInterval(() => {
        setSecond((second) => second + 1);
      }, 1000);
    } else if (second === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [run, second]);

  function stop() {
    setRun(false);
    count.push(second);
    let result = count.reduce((prevValue, currentValue) => {
      return prevValue + currentValue;
    }, 0);
    total.push(result);
  }

  function formatTime(s) {
    const pad = (n) => (n < 10 ? `0${n}` : n);
    const hour = Math.floor(s / 3600);
    const min = Math.floor(s / 60 - hour * 60);
    const sec = Math.floor(s - hour * 3600 - min * 60);
    return `${pad(hour)}:${pad(min)}:${pad(sec)}`;
  }

  return (
    <div className="container">
      <div className="showStopwatch">
        <button className="showButton" onClick={() => setIsOpen(true)}>
          計時器
        </button>
      </div>
      {isOpen && (
        <div className="stopwatch">
          <div className="border">
            <h1 className="time">{formatTime(second)}</h1>
          </div>
          <div className="row">
            <button className="button" onClick={start}>
              開始
            </button>
            <button className="button" onClick={pause}>
              暫停
            </button>
            <button className="button" onClick={stop}>
              結束 (儲存)
            </button>
            <button className="button" onClick={reset}>
              歸零
            </button>
          </div>
          <div className="row2">
            <button className="result" onClick={() => setShowResult(true)}>
              結果
            </button>
          </div>
        </div>
      )}
      {showResult && (
        <div className="showResult">
          <h1 className="title">秒數紀錄</h1>
          <div className="wrapper">
            <div className="left">
              <span className="record">[秒數紀錄]</span>
              {count.map((c) => (
                <div key={c}>{formatTime(c)}</div>
              ))}
            </div>
            <div className="right">
              <span className="record">[累積秒數]</span>
              {total.map((t) => (
                <div key={t}>{formatTime(t)}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
