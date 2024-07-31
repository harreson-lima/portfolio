const gameBoard = document.querySelector(".game__board");
const scoreEle = document.querySelector(".score");
const highScoreEle = document.querySelector(".high_score");

const logoEle = document.querySelector(".game__logo");
const startEle = document.querySelector(".start");
const gameOverEle = document.querySelector(".game_over")
const controlsEle = document.querySelector(".controls")
const restartEle = document.querySelector(".restart")

const foodAudio = new Audio("../Assets/food.wav");

let gameOver = false
let playing = false;

let foodX = 13, foodY = 10;
let snakeX = 15, snakeY = 15;
let velocityX = 0, velocityY = 0;
let snakeBody = [];

let intervalId;

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreEle.innerHTML = `High Score: ${highScore}`;

function startGame() {
  changeFoodPosition();
  logoEle.style.display = "none";
  startEle.style.display = "none";
  if (!gameOver) {
    controlsEle.style.display = "block";
  }
  playing = true;
  intervalId = setInterval(initGame, 125);
}

function initGame() {
  if (gameOver) {
    return handleGameOver();
  }

  htmlMarkup = createElement(foodX, foodY, "game__board__food");

  if (snakeX === foodX && snakeY === foodY) {
    foodAudio.play();
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    updateScore();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += createElement(
      snakeBody[i][0],
      snakeBody[i][1],
      "game__board__head"
    );

    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  gameBoard.innerHTML = htmlMarkup;
}

function changeDirection(e) {

  const key = e.key;
  
  if (key === "Enter" && gameOver) {
    restartGame();
    return;
  }

  if (key === "Enter" && !playing) {
    playing = true;
    startGame();
    return;
  }

  controlsEle.style.display = "none";

  if(playing) {
    e.preventDefault();
  }

  if ((key === "w" || key === "W" || key === "ArrowUp") && 
    velocityY !== 1) 
  {
    velocityX = 0;
    velocityY = -1;
  } else if ((key === "s" || key === "S"|| key === "ArrowDown") && 
    velocityY !== -1) 
  {
    velocityX = 0;
    velocityY = 1;
  } else if (
    (key === "a" || key === "A" || key === "ArrowLeft") &&
    velocityX !== 1) 
  {
    velocityX = -1;
    velocityY = 0;
  } else if (
    (key === "d" || key === "D" || key === "ArrowRight") &&
    velocityX !== -1) 
  {
    velocityX = 1;
    velocityY = 0;
  }
}

function changeFoodPosition() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;

  snakeBody.forEach(dot => {
    if (foodX === dot[0] && foodY === dot[1])
      changeDirection();
  })
}

function updateScore() {
  score++;

  highScore = score >= highScore ? score : highScore;
  localStorage.setItem("highScore", highScore);
  scoreEle.innerHTML = `Score: ${score}`;
  highScoreEle.innerHTML = `High Score: ${highScore}`;
}

function createElement(x,y, className) {
  return `<div class=${className} style="grid-area: ${y} / ${x}"></div>`
}

function handleGameOver() {
  playing = false;
  clearInterval(intervalId);
  gameOverEle.style.display = "block";
  restartEle.style.display = "block";
  gameBoard.innerHTML = "";
}

function restartGame() {
  gameOver = false;
  playing = false;
  (foodX = 13), (foodY = 10);
  (snakeX = 15), (snakeY = 15);
  (velocityX = 0), (velocityY = 0);
  snakeBody = [];
  score = 0;
  lehighScore = localStorage.getItem("highScore") || 0;
  highScoreEle.innerHTML = `High Score: ${highScore}`;
  gameOverEle.style.display = "none";
  restartEle.style.display = "none";
  startGame();
}


document.addEventListener("keydown", changeDirection);