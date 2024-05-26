const buttons = document.querySelectorAll("button");
const score = document.querySelector("h1");
const hrsSpan = document.querySelector("span#hrs");
const minSpan = document.querySelector("span#min");
const secSpan = document.querySelector("span#sec");
let player = "X";
let board = [];
const wincombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 6, 4],
];

function updateTime() {
  const currentDate = new Date();
  const houers = currentDate.getHours();
  const minuts = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  hrsSpan.textContent = houers;
  minSpan.textContent = minuts;
  secSpan.textContent = seconds < 10 ? "0" + seconds : seconds;
}
function toogeplayer() {
  player = player === "X" ? "O" : "X";
}

function scoreUpdate() {
  player === "X"
    ? score.setAttribute("playerX", Number(score.getAttribute("playerX")) + 1)
    : score.setAttribute("playerO", Number(score.getAttribute("playerO")) + 1);
  score.innerText = `${score.getAttribute("playerX")} - ${score.getAttribute(
    "playerO"
  )}`;
}

function wincheck(board) {
  for (comb of wincombs) {
    if (
      board[comb[0]] == player &&
      board[comb[1]] == player &&
      board[comb[2]] == player
    ) {
      scoreUpdate();
      return player;
    }
  }
  if (
    undefined ===
    board.find((str) => {
      return str == "";
    })
  ) {
    return "tie";
  }
}

function wipe() {
  board = [];
  player = "X";
  buttons.forEach((button) => {
    button.innerText = "";
  });
}

function botMove() {
  const posibleMoves = [];
  for (i in board) {
    if (!board[i]) {
      posibleMoves.push(i);
    }
  }

  const randomIndex =
    posibleMoves[Math.floor(Math.random() * posibleMoves.length)];
  buttons[randomIndex].innerText = "O";
  board[randomIndex] = "O";
  if (wincheck(board)) {
    wipe();
  } else {
    toogeplayer();
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.innerText && player === "X") {
      button.innerText = player;
    } else {
      return;
    }

    board = [];
    buttons.forEach((button) => {
      board.push(button.innerText);
    });
    if (wincheck(board)) {
      wipe();
    } else {
      toogeplayer();

      setTimeout(botMove, 500);
    }
  });
});
setInterval(updateTime, 1000);
