export const truncateString = val => {
  if (!val) return;
  const start = val.slice(0, 4);
  const end = val.slice(val.length - 4, val.length);
  return `${start}...${end}`;
};

// convert seconds into hours minutes and seconds
export const getFormatedTime = time => {
  const hours = Math.floor(time / 3600);
  let remainingTime = time - hours * 3600;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime - minutes * 60;
  if (hours > 0) {
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
