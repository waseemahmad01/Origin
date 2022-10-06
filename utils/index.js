export const truncateString = val => {
  const start = val.slice(0, 4);
  const end = val.slice(val.length - 4, val.length);
  return `${start}...${end}`;
};
