const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

// Block the context menu from popping up when you right-click

canvas.addEventListener("contextmenu", block_context_menu);

function block_context_menu(event) {
  event.preventDefault();
}

//LOG MOUSE POSITION
canvas.addEventListener("mousemove", logMousePos);
let previousLog = ""; //Store Previous Position
let screenLog = document.querySelector("#screen-log");
function logMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = Math.round(e.clientX - rect.left);
  const mouseY = Math.round(e.clientY - rect.top);

  console.clear();
  console.log(`Canvas X/Y: ${mouseX}, ${mouseY}`);
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
  Promise.all([
    loadImage("./Assets/Misc/bg.jpg"),
    loadImage("./Assets/Sprites/blackbox.png"),
    loadImage("./Assets/Sprites/redbox.png"),
  ]).then(([backgroundImage, blackBoxImage, redBoxImage]) => {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.drawImage(
      blackBoxImage,
      0,
      93,
      150,
      160,
    );
    context.drawImage(
      redBoxImage,
      646,
      93,
      150,
      160,
    );
  });

  let lastBombTime = new Date().getTime();
  let bombPositions = [];

  function bombSpawn(event) {
    let bombCounter = 0;
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);

    let backgroundImage = new Image();
    backgroundImage.src = "./Assets/Misc/bg.jpg";


    //Spawns bomb, onload, gets random position then adds to the array.
    function blackBombSpawn() {
      const blackBomb = new Image();
      blackBomb.src = "./Assets/Sprites/black_bomb.png";

      blackBomb.onload = function () {
        do {
          xPos = getRandomIntX(canvas.width - 200, 200);
          yPos = getRandomIntY(canvas.height - 50, 100);
        } while (distanceFromBombs(xPos, yPos));
        context.drawImage(blackBomb, xPos, yPos, 60, 30);
        const bomb = getBombPos(xPos, yPos, "black");
        bombPositions.push(bomb);
      };
    }

    function redBombSpawn() {
      const redBomb = new Image();
      redBomb.src = "./Assets/Sprites/red_bomb.png";
      redBomb.onload = function () {
        do {
          xPos = getRandomIntX(canvas.width - 200, 200);
          yPos = getRandomIntY(canvas.height - 50, 100);
        } while (distanceFromBombs(xPos, yPos));
        context.drawImage(redBomb, xPos, yPos, 60, 30);
        const bomb = getBombPos(xPos, yPos, "red");
        bombPositions.push(bomb);
      };
    }
    
    function isOnBomb(mouseX, mouseY) {
      for (let i = 0; i < bombPositions.length; i++){
        const bomb = bombPositions[i];
   if(mouseX > bomb.x && mouseX < bomb.x + 60 && mouseY > bomb.y && mouseY < bomb.y + 30){
     return true;
   }
      }
      return false;
    }

let isMouseOnBomb = false

    //On mouseDown, it sees if the mouse is on a bomb, if it is, it can then go to the mouseUp portion. That's if it actually worked.
    function mouseDown(event){
      console.log("MouseDown initiated");
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      for (let i = 0; i < bombPositions.length; i++) {
        if (isOnBomb(mouseX, mouseY)) {
          isMouseOnBomb = true;
           console.log("isMouseOnBomb:", isMouseOnBomb);
          break;
        }
      }
    }

    
    function isOnBox(mouseX, mouseY){
      const blackBox = { x: 0, y: 93, width: 150, height: 160 }
      const redBox = { x:646, y: 93, width: 150, height: 160 }

    if (mouseX > blackBox.x && mouseX < blackBox.x + (blackBox.width + 10) &&
         mouseY > blackBox.y && mouseY < blackBox.y + (blackBox.height + 10)){
      return true;
         }
      if (mouseX > redBox.x && mouseX < redBox.x + (redBox.width + 10) &&
           mouseY > redBox.y && mouseY < redBox.y + (redBox.height + 10)){
        return true;
           }
      else return false;
    }

//On mouseUp, it should add 1 to the score if its on a box.
    function mouseUp(event){
      console.log("MouseUp initiated");
      const mouseX = event.clientX;
      const mouseY = event.clientY;

     console.log("isOnBomb:", isOnBomb(mouseX,))
      console.log("isOnBox:", isOnBox(mouseX, mouseY));

      if (isOnBox(mouseX, mouseY)){
        context.clearRect(mouseX, mouseY, 60, 30);
context.drawImage(backgroundImage, mouseX, mouseY, 60, 30)
         game_score+= 1;
        updateScore();
      }
      isMouseOnBomb = false;
    }


    //So the bombs dont spawn on top of each other
    function distanceFromBombs(xPos, yPos) {
      for (let i = 0; i < bombPositions.length; i++) {
        const otherBombs = bombPositions[i];
        const distance = Math.sqrt(
          (xPos - otherBombs.x) ** 2 + (yPos - otherBombs.y) ** 2,
        );
        if (distance < 50) {
          return true;
        }
      }
      return false;
    }

    //Gets bomb position and color.
    function getBombPos(xPos, yPos, color) {
      const posString = { x: xPos, y: yPos, color: color };
      return posString;
    }



    //Spawning time mechanism, spawns every # of milliseconds, and randomly picks to spawn a red or black bomb.
    function updateTime() {
      if (bombCounter < 10) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - lastBombTime;

        if (elapsedTime >= 500) {
          const pickBomb = Math.floor(Math.random() * 2);
          if (pickBomb === 0) {
            blackBombSpawn();
          } else {
            redBombSpawn();
          }
          lastBombTime = currentTime;
          bombCounter++;
        }
      }
    }
    return updateTime;
  }
  const update = bombSpawn();
  setInterval(update, 500);
  console.log(bombPositions);
}
load("gameCanvas");
