export const numArrayCreator = (first, quantity) => {
  let arr = [];
  for (let i = first; i < quantity + 1; i++) {
    arr.push(i);
  }
  return arr;
};
