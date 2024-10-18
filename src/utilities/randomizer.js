export const randomizer = () => {
  const randomNumber = (Math.random() * 10).toFixed();
  const month = Number(new Date().getMonth());
  const firstNumber = month === 0 ? 1 : month;
  return `${firstNumber}${randomNumber}`;
};
