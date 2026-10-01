let turn = 1; // 1 o 2
let mode = 'move';
let p1Pos = { r: 0, c: 4 };
let p2Pos = { r: 8, c: 4 };
let p1Barriers = 10;
let p2Barriers = 10;

const board = document.getElementById('board');

function setMode(newMode) {
  mode = newMode;
  document.querySelectorAll('.controls button').forEach(b => b.classList.remove('active'));
  if(mode === 'move') document.getElementById('btn-move').classList.add('active');
  if(mode === 'wall-h') document.getElementById('btn-wall-h').classList.add('active');
  if(mode === 'wall-v') document.getElementById('btn-wall-v').classList.add('active');
}

function renderBoard() {
  board.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.onclick = () => handleCellClick(r, c);

      if (p1Pos.r === r && p1Pos.c === c) {
        const p1 = document.createElement('div');
        p1.className = 'player-1';
        cell.appendChild(p1);
      } else if (p2Pos.r === r && p2Pos.c === c) {
        const p2 = document.createElement('div');
        p2.className = 'player-2';
        cell.appendChild(p2);
      }

      board.appendChild(cell);

      if (c < 8) {
        const gapV = document.createElement('div');
        gapV.className = 'gap-v';
        board.appendChild(gapV);
      }
    }

    if (r < 8) {
      for (let c = 0; c < 9; c++) {
        const gapH = document.createElement('div');
        gapH.className = 'gap-h';
        board.appendChild(gapH);

        if (c < 8) {
          const inter = document.createElement('div');
          inter.className = 'intersection';
          board.appendChild(inter);
        }
      }
    }
  }
}

function handleCellClick(r, c) {
  if (mode === 'move') {
    const currentPos = turn === 1 ? p1Pos : p2Pos;
    const dist = Math.abs(currentPos.r - r) + Math.abs(currentPos.c - c);
    
    if (dist === 1) {
      if (turn === 1) p1Pos = { r, c };
      else p2Pos = { r, c };
      
      checkWin();
      switchTurn();
      renderBoard();
    }
  }
}

function switchTurn() {
  turn = turn === 1 ? 2 : 1;
  document.getElementById('turn-display').innerText = `Turno: Jugador ${turn} (${turn === 1 ? 'Verde' : 'Rojo'})`;
}

function checkWin() {
  if (p1Pos.r === 8) alert('¡Jugador 1 ha ganado!');
  if (p2Pos.r === 0) alert('¡Jugador 2 ha ganado!');
}

renderBoard();