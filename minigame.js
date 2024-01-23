const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

const numericInputs = document.querySelectorAll("[inputmode='numeric']");


function refreshPage(){
  window.location.reload();
}
//Guess Input box, only allows numbers.
numericInputs.forEach((input) => {
  validateInput(input);
});

function validateInput(x) {
  x.addEventListener("beforeinput", function (e) {
    let previousValue = x.value;
    e.target.addEventListener(
      "input",
      function () {
        if (x.validity.patternMismatch) {
          x.value = previousValue;
        }
      },
      { once: true }
    );
  });
} 

function updateScore() {
document.getElementById("guess_score").textContent = guess_score;
}
let guess_score = 0;

let bombCounter;

const messageContainer = document.createElement("div");
messageContainer.style.textAlign = "center";
document.body.appendChild(messageContainer);

function checkGuess(event){
   event.preventDefault(); 
  const guessInput = document.querySelector('input[type="number"]');
  const guess = parseInt(guessInput.value);

messageContainer.innerHTML = '';
  const h1 = document.createElement("h1");

 if (guess === bombCounter) {
    // Code for winning scenario
    const h1 = document.createElement("h1");
    h1.textContent = "YOU WIN!";
    messageContainer.appendChild(h1);
   guess_score+= 1;
   updateScore();
  } else {
    // Code for losing scenario
    const h1 = document.createElement("h1");
    h1.textContent = "YOU LOSE!";
    messageContainer.appendChild(h1);

   //Clear Canvas for Game Over Screen
   const canvasElements = document.querySelectorAll("#gameCanvas");
   canvasElements.forEach((canvas) => (canvas.style.display = "none"));
  }
  document.body.appendChild(messageContainer);
}

function getRandomBombCount() {
  return Math.floor(Math.random() * 10); // Generate Random Bomb Spawn from 1-10. or it should anyways...
}

function load(x) {
  const canvas = document.getElementById(x);
  const context = canvas.getContext("2d");

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  //Loads images in order, in other main game it loaded the bg then the boxes.
  Promise.all([
    loadImage("./Assets/Misc/bg.jpg"),
  ]).then(([backgroundImage]) => {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  });

  let bombPositions = [];

  function game() {
    let lastBombTime = new Date().getTime();
    let countCheck = 0;

    let backgroundImage = new Image();
    backgroundImage.src = "./Assets/Misc/bg.jpg";


    function getRandomIntX(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomIntY(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function bombSpawn() {
      const blackBomb = new Image();
      blackBomb.src = "./Assets/Sprites/black_bomb.png";
      blackBomb.onload = function () {
        do {
          xPos = getRandomIntX(canvas.width - 200, 200);
          yPos = getRandomIntY(canvas.height - 50, 100);
        } while (distanceFromBombs(xPos, yPos));
        context.drawImage(blackBomb, xPos, yPos, 60, 30);
        const bomb = getBombPos(xPos, yPos);
        bombPositions.push(bomb);
        countCheck++;

        bombCounter = getRandomBombCount();

       
      };
    }

    //Makes it so the bombs don't spawn on top of each other.
    function distanceFromBombs(xPos, yPos) {
      for (let i = 0; i < bombPositions.length; i++) {
        const otherBombs = bombPositions[i];
        const distance = Math.sqrt(
          (xPos - otherBombs.x) ** 2 + (yPos - otherBombs.y) ** 2
        );
        if (distance < 50) {
          return true;
        }
      }
      return false;
    }

    function getBombPos(xPos, yPos) {
      const posString = { x: xPos, y: yPos };
      return posString;
    }

    //Spawns bomb every # of milliseconds
    function updateTime() {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - lastBombTime;

      if (elapsedTime >= 500) {
        bombSpawn();
        lastBombTime = currentTime;


        if(countCheck === bombCounter){
          clearInterval(intervalID);
        }
      }
    }
    return updateTime;
  }
  const update = game();
const intervalID = setInterval(update, 500);
} 
load("gameCanvas");