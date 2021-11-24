const colors = 4;
const pixels = 5;

const colorPalette = document.getElementById('color-palette');
const pixelBoard = document.getElementById('pixel-board');

//  PALETA DE CORES
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

//  QUADRO DE PIXELS
const clear = document.getElementById('clear-board');

for (let i = 0; i < pixels; i += 1) {
  pixelBoard.appendChild(document.createElement('div'));
  for (let j = 0; j < pixels; j += 1) {
    pixelBoard.children[i].appendChild(document.createElement('div'));
    pixelBoard.children[i].children[j].className = 'pixel';
  }
}

function paintPixel(click) {
  if (click.target.classList.contains('pixel')) {
    const selectedHTML = document.getElementsByClassName('selected')[0];
    const bgClrClicked = window.getComputedStyle(selectedHTML).getPropertyValue('background-color');
    /* const clicked =  */
    const clicked = click;
    clicked.target.style.backgroundColor = bgClrClicked;
  }
}
function clearPainting() {
/*   for (const line of pixelBoard.children) {
    for (const pixel of line.children) {
      pixel.style.backgroundColor = 'white';
    }
  } */
  for (let i = 0; i < pixelBoard.children.length; i += 1) {
    for (let j = 0; j < pixelBoard.children[i].children.length; j += 1) {
      pixelBoard.children[i].children[j].style.backgroundColor = 'white';
    }
  }
}

pixelBoard.addEventListener('click', paintPixel);
clear.addEventListener('click', clearPainting);
