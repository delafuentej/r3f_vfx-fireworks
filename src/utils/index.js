export const getRandomColorFromPalette = (colors) => {
  const palette = colors[randInt(0, colors.length - 1)];
  return palette[randInt(0, colors.length - 1)];
};
