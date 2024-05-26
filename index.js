const buttons = document.querySelectorAll("button");
const score = document.querySelector("h1");
const hrsSpan = document.querySelector("span#hrs");
const minSpan = document.querySelector("span#min");
const secSpan = document.querySelector("span#sec");
let player = "X";
let board = [];
let time = new Date();
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
let seconds = 0;
function updateTime() {
  seconds += 1;
  let houers = Math.floor(seconds / 3600);
  let minuts = Math.floor((seconds - houers * 3600) / 60);
  let sec = seconds - houers * 3600 - minuts * 60;
  hrsSpan.innerText = houers < 10 ? "0" + houers : houers;
  minSpan.innerText = ": " + (minuts < 10 ? "0" + minuts : minuts);
  secSpan.innerText = ": " + (sec < 10 ? "0" + sec : sec);
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
      console.log(new Date(new Date() - time));
      time = new Date();
      return player;
    }
  }
  if (
    undefined ===
    board.find((str) => {
      return str == "";
    })
  ) {
    console.log(new Date(new Date() - time));
    time = new Date();
    return "tie";
  }
}

function wipe() {
  board = [];
  player = "X";
  buttons.forEach((button) => {
    button.innerText = "";
  });
  seconds = 0;
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
updateTime;
setInterval(updateTime, 1000);
