import {useEffect, useState} from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const handleTic = () => {
    if (start) {
      setTime(time + 1);
    }
  };

  const startTimer = () => {
    setStart(true);
  };

  const stopTimer = () => {
    setStart(false);
  };

  const clearTimer = () => {
    setTime(0);
  };

  useEffect(() => {
    const timer = setInterval(() => handleTic(), 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return {
    start,
    time,
    startTimer,
    stopTimer,
    clearTimer,
  };
};

export default useTimer;
