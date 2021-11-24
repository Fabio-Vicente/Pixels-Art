const colors = 4;
const pixels = 5;

const colorPalette = document.getElementById('color-palette');
const pixelBoard = document.getElementById('pixel-board');

for (let i = 0; i < colors; i += 1) {
  colorPalette.appendChild(document.createElement('div'));
  colorPalette.children[i].className = 'color';
}

colorPalette.children[0].classList.add('selected');

function select(click) {
  if (click.target !== colorPalette) {
    document.querySelector('.selected').classList.remove('selected');
    click.target.classList.add('selected');
  }
}

colorPalette.addEventListener('click', select);

for (let i = 0; i < pixels; i += 1) {
  pixelBoard.appendChild(document.createElement('div'));
  for (let j = 0; j < pixels; j += 1) {
    pixelBoard.children[i].appendChild(document.createElement('div'));
    pixelBoard.children[i].children[j].className = 'pixel';
  }
}
