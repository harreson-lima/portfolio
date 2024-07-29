
const gameBoard = document.querySelector(".game__board");
const scoreEle = document.querySelector(".score");
const highScoreEle = document.querySelector(".high_score");




let foodX = 13, foodY = 10;
let snakeX = 22, snakeY = 15;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false
let intervalId;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreEle.innerHTML = `High Score: ${highScore}`;

function changeFoodPosition() {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}




function changeDirection(e) {
  if (e.key === "w" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "s" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "a" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "d" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
}




function handleGameOver() {
  clearInterval(intervalId);
  alert("Game Over!");
}









function initGame() {

  if (gameOver) {
    return handleGameOver();
  }

  let htmlMarkup = `<div class="game__board__food" style="grid-area: ${foodY} / ${foodX}"></div>`
  
  if(snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;


    highScore = score >= highScore ? score:highScore;
    localStorage.setItem("highScore", highScore);
    scoreEle.innerHTML = `Score: ${score}`;
    highScoreEle.innerHTML = `High Score: ${highScore}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
    
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class="game__board__head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
    
  }
  

  gameBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
intervalId = setInterval(initGame, 125);
document.addEventListener("keypress", changeDirection);