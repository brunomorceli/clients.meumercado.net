const colors = [
  '#faad14',
  '#ffa940',
  '#ef5350',
  '#fa541c',
  '#fa541c',
  '#cf1322',
  '#820014',
  '#ad2102',
  '#bae637',
  '#52c41a',
  '#7cb305',
  '#3f6600',
  '#13c2c2',
  '#08979c',
  '#42a5f5',
  '#03a9f4',
  '#1677ff',
  '#0288d1',
  '#1976d2',
  '#1565c0',
  '#01579b',
  '#00474f',
  '#002c8c',
  '#ba68c8',
  '#9c27b0',
  '#722ed1',
  '#391085',
  '#eb2f96',
  '#9e1068',
  '#ffffff',
  '#e0e0e0',
  '#bfbfbf',
  '#9e9e9e',
  '#434343', 
  '#212121',
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
