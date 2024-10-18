export const maleChecker = (namesArray, testString = "Куц Олена Василівна") => {
  let index1 = testString.indexOf(" ");
  index1 += 1;
  const sliced = testString.slice(index1);
  const index2 = sliced.indexOf(" ");
  const finalName = sliced.slice(0, index2);
  const result = namesArray.some((n) => n === finalName);
  return result;
};
