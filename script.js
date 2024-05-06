const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

const paddleWidth = 10;
const paddleHeight = 100;
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;

const player1Speed = 15;
const player2Speed = 10;

let upArrowPressed = false;
let downArrowPressed = false;

let gameStarted = false;
let paused = false;
let score = 0;

document.getElementById('start-button').addEventListener('click', function () {
    stopGame();
    resetGame();
    startGame();
});

document.getElementById('pause-button').addEventListener('click', function () {
    paused = true;
    document.getElementById('pause-button').classList.add('hidden');
    document.getElementById('resume-button').classList.remove('hidden');
    document.getElementById('exit-button').classList.remove('hidden');
});

document.getElementById('resume-button').addEventListener('click', function () {
    paused = false;
    document.getElementById('pause-button').classList.remove('hidden');
    document.getElementById('resume-button').classList.add('hidden');
    document.getElementById('exit-button').classList.add('hidden');
});

document.getElementById('exit-button').addEventListener('click', function () {
    stopGame();
});

document.getElementById('restart-button').addEventListener('click', function () {
    document.getElementById('game-over').classList.add('hidden');
    resetGame();
    startGame();
});

document.getElementById('exit-gameover-button').addEventListener('click', function () {
    document.getElementById('game-over').classList.add('hidden');
    stopGame();
});

function startGame() {
    gameStarted = true;
    canvas.classList.remove('hidden');
    document.getElementById('button-container').classList.add('hidden');
    document.getElementById('pause-button').classList.remove('hidden');
    score = 0;
    document.getElementById('background-music').play();
}

function stopGame() {
    gameStarted = false;
    paused = false;
    canvas.classList.add('hidden');
    document.getElementById('button-container').classList.remove('hidden');
    document.getElementById('pause-button').classList.add('hidden');
    document.getElementById('resume-button').classList.add('hidden');
    document.getElementById('exit-button').classList.add('hidden');
    document.getElementById('restart-button').classList.add('hidden');
    document.getElementById('exit-gameover-button').classList.add('hidden');
    document.getElementById('start-button').classList.remove('hidden'); // Show Start button
    document.getElementById('level-button').classList.remove('hidden'); // Show Level button
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(0, player1Y, paddleWidth, paddleHeight);
    ctx.rect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    ctx.font = '30px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Score: ${score}`, 10, 40);
}

function updateGame() {
    if (!gameStarted || paused) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < 0) {
        gameOverLeftWall(); // Call a different function for game over at the left wall
    } else if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            gameOver();
        }
    }

    if (ballX - ballRadius < paddleWidth) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            score++;

            // Play paddle sound effect
            document.getElementById('paddle-sound').currentTime = 0;
            document.getElementById('paddle-sound').play();
        }
    }

    if (upArrowPressed && player1Y > 0) {
        player1Y -= player1Speed;
    } else if (downArrowPressed && player1Y < canvas.height - paddleHeight) {
        player1Y += player1Speed;
    }

    const playerYCenter = player2Y + (paddleHeight / 2);
    if (playerYCenter < ballY) {
        player2Y += player2Speed;
    } else {
        player2Y -= player2Speed;
    }
}

function resetGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    score = 0;
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
        upArrowPressed = true;
    } else if (event.key === 'ArrowDown') {
        downArrowPressed = true;
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowUp') {
        upArrowPressed = false;
    } else if (event.key === 'ArrowDown') {
        downArrowPressed = false;
    }
}
function handleClick(direction) {
    console.log("down click");
    if (direction === 'up') {
        upArrowPressed = true;
    } else if (direction === 'down') {
        downArrowPressed = true;
    }
}

function handleMouseLift(direction) {
    console.log("up click");
    if (direction === 'up') {
        upArrowPressed = false;
    } else if (direction === 'down') {
        downArrowPressed = false;

    }
}
function handleTouch(direction) {
    console.log("touch click");
    if (direction === 'up') {
        upArrowPressed = true;
    } else if (direction === 'down') {
        downArrowPressed = true;
    }
}

function handleTouchLift(direction) {
    console.log("touch lift");
    if (direction === 'up') {
        upArrowPressed = false;
    } else if (direction === 'down') {
        downArrowPressed = false;

    }
}

function gameOver() {
    stopGame();
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('game-over-text').innerText = `Game Over: Your score is ${score}`;
    document.getElementById('restart-button').classList.remove('hidden');
    document.getElementById('exit-gameover-button').classList.remove('hidden');

    // Display game over message until Restart or Exit button is clicked
    const restartButton = document.getElementById('restart-button');
    const exitButton = document.getElementById('exit-gameover-button');

    restartButton.addEventListener('click', hideGameOverMessage);
    exitButton.addEventListener('click', hideGameOverMessage);
}

function gameOverLeftWall() {
    stopGame();
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('game-over-text').innerText = `Game Over: Your score is ${score}`;
    document.getElementById('restart-button').classList.remove('hidden');
    document.getElementById('exit-gameover-button').classList.remove('hidden');
    document.getElementById('start-button').classList.add('hidden'); // Hide Start button
    document.getElementById('level-button').classList.add('hidden'); // Hide Level button

    document.getElementById('left-wall-sound').currentTime = 0;
    document.getElementById('left-wall-sound').play();

    // Display game over message until Restart or Exit button is clicked
    const restartButton = document.getElementById('restart-button');
    const exitButton = document.getElementById('exit-gameover-button');

    restartButton.addEventListener('click', hideGameOverMessage);
    exitButton.addEventListener('click', hideGameOverMessage);
}

function hideGameOverMessage() {
    document.getElementById('game-over').classList.add('hidden');
}

function gameLoop() {
    drawGame();
    updateGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
