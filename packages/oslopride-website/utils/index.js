export const capitalizeWord = str => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizeString = str =>
  str
    .split(" ")
    .map(capitalizeWord)
    .join(" ");
