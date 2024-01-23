// VARIABLES

//declare box variables
 let black_box
 let red_box

 //declare score variables
 let current_score = 0;
 let high score;

//Create Function to generate bombs throught the spawners.

function bombSpawner(){
<img id="blackbomb" src="./Assets/sprites/black_bomb.png" width=50px height=25px>
<img id="redbomb" src="./Assets/Sprites/red_bomb.png" width=50px height=25px>
}

Movement: Make them appear randomly and have a time limit to be acted uppon

Interactibility: Allow user to use mouse to click right and left mouse buttons to put into boxes

Game End: Bomb placed in wrong box, go to game over canvas, displaying final score and the high score. Also if a new high score was achieved.

function gameOver(){
if (game_over){
current_score;
}
}


//Create score function
done.

//Create high score function
if (current_score > high_score) {
high_score == current_score;
}
}

****************************************************************
//LOG MOUSE POSITION
canvas.addEventListener("mousemove", logMousePos);
let previousLog = ""; //Store Previous Position
let screenLog = document.querySelector("#screen-log");
function logMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = Math.round(e.clientX - rect.left);
  const mouseY = Math.round(e.clientY - rect.top);

  // console.clear();
  // console.log(`Canvas X/Y: ${mouseX}, ${mouseY}`);
}

console.log("Canvas Dimensions:", canvas.width, "*", canvas.height, "pixels");