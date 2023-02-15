let order = [];
let playerOrder = [];
let flash;
let turn;
let patternmatch;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const highScore = document.querySelector(".high-score");
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked) {
    strict = true;
  } else {
    strict = false;
  }
});

if(!sessionStorage.highScore)
{
  sessionStorage.setItem("highScore",0)
  highScore.innerHTML = sessionStorage.highScore
}

onButton.addEventListener('click', (event) => {
  if (onButton.checked) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

highScore.innerHTML = sessionStorage.highScore;
startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  patternmatch = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash === turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] === 1) one();
      if (order[flash] === 2) two();
      if (order[flash] === 3) three();
      if (order[flash] === 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.opacity = 0.2;
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.opacity = 0.2;
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.opacity = 0.2;
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.opacity = 0.2;
}

function clearColor() {
  topLeft.style.opacity = 1;
  topRight.style.opacity = 1;
  bottomLeft.style.opacity = 1;
  bottomRight.style.opacity = 1;
}

function flashColor() { 
  topLeft.style.opacity = 0.2;
  topRight.style.opacity = 0.2;
  bottomLeft.style.opacity = 0.2;
  bottomRight.style.opacity = 0.2;
}

topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    patternmatch = false;
  
  if (playerOrder.length == 5 && patternmatch) {
    winGame();
  }
  if (!patternmatch) {
    flashColor();
    turnCounter.innerHTML = "LOST!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      // console.log(sessionStorage.highScore,turn)
      if(turn > Number(sessionStorage.highScore))
      sessionStorage.highScore = turn;
      highScore.innerHTML= sessionStorage.highScore;

      alert("your score  " + turn )
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        patternmatch = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }
//change name of patternmatch variable
//use === instead ==
//replace == comparision with !
// check indentation and spacing

  if (turn == playerOrder.length && patternmatch && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    
    intervalId = setInterval(gameTurn, 800);
 

  }

}

function winGame() {
  flashColor();

  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
 alert("Your score  "+ playerOrder.length)

}






