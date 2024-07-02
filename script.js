/*
* Данные для скрипта
* Предполагаю, что они приходят массивом объектов
*/
const pathData = [
  { length: 1665, angle: 0 },
  { length: 947, angle: 90 },
  { length: 557, angle: 0 },
  { length: 1300, angle: 90 },
  { length: 2225, angle: 180 },
  { length: 2239, angle: 270 },
];

/* Скрип для вычисления координат */
const mmToCm = (mm) => mm * 0.1;

export const createSvgPath = (data) => {
  if (!data.length) return '';

  const startingX = 0;
  const startingY = 0;
  const startPoint = `M ${startingX} ${startingY} `;

  let currentX = 0;
  let currentY = 0;

  const pathString =  data.reduce((acc, point) => {
    const lengthInCm = mmToCm(point.length);
    const angleInRadians = point.angle * Math.PI / 180;

    currentX += lengthInCm * Math.cos(angleInRadians);
    currentY += lengthInCm * Math.sin(angleInRadians);

    return `${acc} L ${currentX.toFixed(2)} ${currentY.toFixed(1)}`;
  }, startPoint);

  return `${pathString} Z`;
};

/* Отрисовка path в svg  */
const pathCommandsFigure = createSvgPath(pathData);

const svgPath = document.getElementById('svgPath');
svgPath.setAttribute('d', pathCommandsFigure);