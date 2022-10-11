let container = document.getElementById('resizeMe') as HTMLElement;

let x = 0;
let y = 0;

let w = 0;
let h = 0;

const screenWidth = window.screen.width;
const maxLeftBorder = screenWidth / 1.5;

export const mouseMoveHandler = (e: MouseEvent) => {
  const dx = -(e.clientX - x);
  const dy = -(e.clientY - y);

  let shift = w + dx;

  if (shift > maxLeftBorder) shift = maxLeftBorder;
  if (shift < 50) shift = 50;

  container.style.right = `${shift}px`;
  container.style.height = `${h + dy}px`;
};

export const mouseUpHandler = () => {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};

export const mouseDownHandler = (e: MouseEvent) => {
  x = e.clientX;
  y = e.clientY;

  const styles = window.getComputedStyle(container);
  w = parseInt(styles.right, 10);
  h = parseInt(styles.height, 10);

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

export const resizeEvent = (widgetMovingContainer: HTMLElement) => {
  container = widgetMovingContainer;
  widgetMovingContainer.addEventListener('mousedown', mouseDownHandler);
};

export const resetWidget = (widgetMovingContainer: HTMLElement) => {
  container = widgetMovingContainer;

  widgetMovingContainer.style.right = '';
  widgetMovingContainer.style.height = '';
};
