export const truncateString = val => {
  if (!val) return;
  const start = val.slice(0, 4);
  const end = val.slice(val.length - 4, val.length);
  return `${start}...${end}`;
};
