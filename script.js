/* Данные для скрипта */
const pathData = [
  { length: 1665, angle: 0 },
  { length: 947, angle: 90 },
  { length: 557, angle: 0 },
  { length: 1300, angle: 90 },
  { length: 2225, angle: 180 },
  { length: 2239, angle: 270 },
]
/* Предполагаю, что данные приходят массивом объектов */

/* Скрип для вычисления координат */
const createSvgPath = (data) => {
  const mmToCm = (mm) => mm * 0.1;
  
  const startingX = 0;
  const startingY = 0;

  let currentX = 0;
  let currentY = 0;

  return data.reduce((acc, point, index) => {
    const lengthInCm = mmToCm(point.length);
    const angleInRadians = point.angle * Math.PI / 180;

    currentX += lengthInCm * Math.cos(angleInRadians);
    currentY += lengthInCm * Math.sin(angleInRadians);

    if (index === 0) {
      return `${acc} M ${startingX} ${startingY} L ${currentX.toFixed(2)} ${currentY.toFixed(1)}`
    }

    if (index === data.length - 1) {
      return `${acc} L ${currentX.toFixed(2)} ${currentY.toFixed(1)} Z`
    }

    return `${acc} L ${currentX.toFixed(2)} ${currentY.toFixed(1)}`
  }, '');
};

/* Отрисовка path в svg  */
const pathCommandsFigure = createSvgPath(pathData);

const svgPath = document.getElementById('svgPath');
svgPath.setAttribute('d', pathCommandsFigure);