const colors = [
  '#fa541c',
  '#cf1322',
  '#820014',
  '#fa541c',
  '#ad2102',
  '#ffa940',
  '#faad14',
  '#bae637',
  '#7cb305',
  '#3f6600',
  '#52c41a',
  '#13c2c2',
  '#08979c',
  '#00474f',
  '#1677ff',
  '#002c8c',
  '#2f54eb',
  '#722ed1',
  '#391085',
  '#eb2f96',
  '#9e1068',
  '#bfbfbf',
  '#434343', 
];

function getRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomColors(amount: 5): string[] {
  if (amount >= colors.length) {
    return colors;
  }

  let tempColors = [...colors];
  let results: string[] = [];
  while(results.length < amount) {
    const index = Math.floor(Math.random() * tempColors.length);
    results.push(tempColors.splice(index, 1)[0]);
  }

  return colors;
}

export const ColorUtils = {
  getColors: () => colors,
  getRandomColor,
  getRandomColors,
};
