const colors = 4;
const colorPalette = document.getElementById('color-palette');
const pixelBoard = document.getElementById('pixel-board');
const buttonGenBoard = document.getElementById('generate-board');
const input = document.getElementById('board-size');
const clear = document.getElementById('clear-board');
const save = document.getElementById('save');
let pixels = 5;

if (localStorage.length === 0) {
  localStorage.setItem('color', JSON.stringify([]));
  localStorage.setItem('board', '');
}
const colorsSaved = JSON.parse(localStorage.getItem('color'));

//  PALETA DE CORES
for (let i = 0; i < colors; i += 1) {
  colorPalette.appendChild(document.createElement('div'));
  colorPalette.children[i].className = 'color';
}

function verifyColorsSaved(index) {
  if (colorsSaved[index - 1] !== undefined) {
    colorPalette.children[index].style.backgroundColor = colorsSaved[index - 1];
    colorPalette.children[index].classList.add('saved');
    return true;
  }
  return false;
}
function randomColors() {
  let R;
  let G;
  let B;
  for (let i = 1; i < colorPalette.children.length; i += 1) {
    if (!verifyColorsSaved(i)) {
      R = parseInt(Math.random() * 256, 10);
      G = parseInt(Math.random() * 256, 10);
      B = parseInt(Math.random() * 256, 10);
      colorPalette.children[i].style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }
  }
}
function select(click) {
  if (click.target !== colorPalette) {
    document.querySelector('.selected').classList.remove('selected');
    click.target.classList.add('selected');
  }
}
function saveColor(color) {
  if (color.target !== colorPalette && color.target !== colorPalette.children[0]) {
    if (color.target.classList.contains('saved')) {
      colorsSaved.splice(colorsSaved.indexOf(color.target.style.backgroundColor), 1);
      localStorage.setItem('color', JSON.stringify(colorsSaved));
      color.target.classList.remove('saved');
    } else {
      const savedColor = window.getComputedStyle(color.target).getPropertyValue('background-color');
      colorsSaved.push(savedColor);
      localStorage.setItem('color', JSON.stringify(colorsSaved));
      color.target.classList.add('saved');
    }
  }
}

colorPalette.children[0].classList.add('selected');
randomColors();

colorPalette.onclick = select;
colorPalette.addEventListener('dblclick', saveColor);

//  QUADRO DE PIXELS
function paintPixel(click) {
  if (click.target.classList.contains('pixel')) {
    const clicked = click;
    /*     if (click.target.style.backgroundColor !== '') {
      clicked.target.style.backgroundColor = '';
      return;
    } */
    const selectedHTML = document.getElementsByClassName('selected')[0];
    const bgClrClicked = window.getComputedStyle(selectedHTML).getPropertyValue('background-color');
    clicked.target.style.backgroundColor = bgClrClicked;
  }
}
function clearBoard() {
  for (let i = pixelBoard.children.length - 1; i >= 0; i -= 1) {
    pixelBoard.removeChild(pixelBoard.children[i]);
  }
}
function eventsBoardAllowed(event) {
  if (event.type !== 'click' && event.key !== 'Enter' && event.type !== 'load') {
    return false;
  }
  return true;
}
function rectifyInRange(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
function changePixelsSize(event) {
  if (event.type === 'click' || event.key === 'Enter') {
    if (input.value === '' || input.value < 1) {
      return false;
    }
    pixels = rectifyInRange(input.value, 5, 50);
  }
  return true;
}
function generateBoard() {
  for (let i = 0; i < pixels; i += 1) {
    pixelBoard.appendChild(document.createElement('div'));
    for (let j = 0; j < pixels; j += 1) {
      pixelBoard.children[i].appendChild(document.createElement('div'));
      pixelBoard.children[i].children[j].className = 'pixel';
    }
  }
}
function importBoard() {
  const board = JSON.parse(localStorage.getItem('board'));
  for (let i = 0; i < board.length; i += 1) {
    pixelBoard.appendChild(document.createElement('div'));
    for (let j = 0; j < board[i].length; j += 1) {
      pixelBoard.children[i].appendChild(document.createElement('div'));
      pixelBoard.children[i].children[j].className = 'pixel';
      pixelBoard.children[i].children[j].style.backgroundColor = board[i][j];
    }
  }
  localStorage.setItem('board', '');
}
function createBoard(event) {
  if (!eventsBoardAllowed(event)) {
    return;
  }
  if (!changePixelsSize(event)) {
    alert('Board inválido!');
    return;
  }
  if (localStorage.board === '') {
    clearBoard();
    generateBoard();
  } else {
    importBoard();
  }
}

//  CONFIGURAÇÕES
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
function storageBoard() {
  const board = [];
  for (let i = 0; i < pixelBoard.children.length; i += 1) {
    const line = [];
    for (let j = 0; j < pixelBoard.children.length; j += 1) {
      line.push(pixelBoard.children[i].children[j].style.backgroundColor);
    }
    board.push(line);
  }
  localStorage.setItem('board', JSON.stringify(board));
}
function saveBoard(store) {
  const storage = store;
  if (store.target.classList.contains('board')) {
    localStorage.setItem('board', '');
    storage.target.innerText = 'Salvar';
    store.target.classList.remove('board');
  } else {
    storageBoard();
    storage.target.innerText = 'Salvo!';
    store.target.classList.add('board');
  }
}

window.onload = createBoard;
pixelBoard.onclick = paintPixel;
clear.onclick = clearPainting;
buttonGenBoard.onclick = createBoard;
input.onkeyup = createBoard;
save.onclick = saveBoard;
