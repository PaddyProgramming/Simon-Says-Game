// initalizing time in between flashes of simons sequence
let speed = 2000;
// array to hold simons sequence
simonsSeq = [];
// array to hold players sequence
playerSeq = [];
// creating objects that are linked to game buttons
var startButton = document.getElementById("start");
var topLeft = document.getElementById("0");
var topRight = document.getElementById("1");
var bottomRight = document.getElementById("2");
var bottomLeft = document.getElementById("3");
// initializing time limit for player to repeat the sequence
// referenced JK's code for this feature
const roundTimeSeconds = 5000;
// boolean that signifies if the game is over
// needed to conditionally disable/enable event listener functions on buttons
let gameOver = true;

// below are 4 functions that get added to each button respectively
// on click add the button id value to playerSeq array (via this.getAttribute)
// flash the button that has been clicked by passing id value to addFlash function
// if the click is the last of the sequence (playerSeq length = seq length), players turn is over
// remove event listener from each button to prevent clicking during simons turn
// call check() function to check for accuracy
// reset playerSeq array so next player turn starts fresh
// call simonsTurn function

// green button
topLeftFunc = function () {
  // this 'if' statement means the button is only clickable if it is the players turn and game is not over
  if (!gameOver) {
    id = this.getAttribute("id");
    // console.log(id);
    playerSeq.push(id);
    addFlash(id);
    // this 'if' statement checks if this is the last signal of the sequence
    // if yes then clear the timer (as per JK's code)
    // then remove the event listeners from the player buttons
    // call check to check accuracy
    // reset playerSeq array so that the player starts fresh next turn
    // call simonsTurn function to move to next round of the game
    if (playerSeq.length === simonsSeq.length) {
      clearTimeout(roundTimerControl);
      topLeft.removeEventListener("click", topLeftFunc);
      topRight.removeEventListener("click", topRightFunc);
      bottomRight.removeEventListener("click", bottomRightFunc);
      bottomLeft.removeEventListener("click", bottomLeftFunc);
      check();
      playerSeq = [];
      simonsTurn();
    }
  }
};
// red button
topRightFunc = function () {
  if (!gameOver) {
    id = this.getAttribute("id");
    // console.log(id);
    playerSeq.push(id);
    addFlash(id);
    if (playerSeq.length === simonsSeq.length) {
      clearTimeout(roundTimerControl);
      topLeft.removeEventListener("click", topLeftFunc);
      topRight.removeEventListener("click", topRightFunc);
      bottomRight.removeEventListener("click", bottomRightFunc);
      bottomLeft.removeEventListener("click", bottomLeftFunc);
      check();
      playerSeq = [];
      simonsTurn();
    }
  }
};
// blue button
bottomLeftFunc = function () {
  if (!gameOver) {
    id = this.getAttribute("id");
    console.log(id);
    playerSeq.push(id);
    addFlash(id);
    if (playerSeq.length === simonsSeq.length) {
      clearTimeout(roundTimerControl);
      topLeft.removeEventListener("click", topLeftFunc);
      topRight.removeEventListener("click", topRightFunc);
      bottomRight.removeEventListener("click", bottomRightFunc);
      bottomLeft.removeEventListener("click", bottomLeftFunc);
      check();
      playerSeq = [];
      simonsTurn();
    }
  }
};
// yellow button
bottomRightFunc = function () {
  if (!gameOver) {
    id = this.getAttribute("id");
    console.log(id);
    playerSeq.push(id);
    addFlash(id);
    if (playerSeq.length === simonsSeq.length) {
      clearTimeout(roundTimerControl);
      topLeft.removeEventListener("click", topLeftFunc);
      topRight.removeEventListener("click", topRightFunc);
      bottomRight.removeEventListener("click", bottomRightFunc);
      bottomLeft.removeEventListener("click", bottomLeftFunc);
      check();
      playerSeq = [];
      simonsTurn();
    }
  }
};

// play function that gets called when start button is pressed, this begins a new game
// resets speed variable (time in between signals) to 2 seconds so that new games start with correct inital speed
play = function () {
  speed = 2000;
  // gameOver assigned false as game is beginning
  gameOver = false;
  // reset current score to 0 for each new game
  document.getElementById("currentScore").innerHTML = 0;
  // reset player and simons sequence arrays to empty for new games
  playerSeq = [];
  simonsSeq = [];
  // call function to turn light red => green
  turnOnLight();
  // call simons turn after 1 second, this is so that game starts 3 seconds (1 second here  + 2 seconds delay in simonsTurn)
  // after the start button is pressed as per instructions
  setTimeout(function () {
    simonsTurn();
  }, 1000);
  // remove event listener from start button so it cannot be clicked during player/simons turn
  startButton.removeEventListener("click", play);
};

// these lines remove the event listener from the buttons initally,
// they will be added on after simonsTurn so that they can only be clicked during players turn
topLeft.removeEventListener("click", topLeftFunc);
topRight.removeEventListener("click", topRightFunc);
bottomRight.removeEventListener("click", bottomRightFunc);
bottomLeft.removeEventListener("click", bottomLeftFunc);

// this adds the event listener to the start button initally so that it is available to start a new game
startButton.addEventListener("click", play);

// simons turn (computers turn) function
simonsTurn = function () {
  // after the 5th signal the time in between signals is shortened to speed up
  if (simonsSeq.length == 5) {
    // console.log("change speed");
    speed = 1500;
  }
  // after the 9th signal the time in between signals is shortened to speed up
  if (simonsSeq.length == 9) {
    // console.log("change speed");
    speed = 1000;
  }
  // after the 13th signal the time in between signals is shortened to speed up
  if (simonsSeq.length == 13) {
    // console.log("change speed");
    speed = 750;
  }
  // call this function to generate random number and add it to simonsSeq, this array holds the signals the player must repeat
  generateRandomNumber();
  // i is initalized as 0 at the start of simonsTurn every time it is called so that the array is iterated over start to finish
  // i acts as a pointer that iterates over the simonsSeq array from beginning to end
  var i = 0;
  // this interval (turnInterval) executes the code block within repeating every set amount of seconds (speed variable)
  var turnInterval = setInterval(function () {
    // every value stored in the simonsSeq array will be assigned to the 'id' variable in turn
    id = simonsSeq[i];
    // a flash is added to the corresponding button on screen via the button (html div's) id porperty
    addFlash(id);
    // i is incremented to move along the array in sequence
    i++;
    // 'if' i is pointing at the last value in the array (last signal of simonsTurn)
    // this signifies the end of simonsTurn => clears this interval (turnInterval)
    // signifies the start of the players turn => adds event listeners to the buttons (html div's)
    if (i == simonsSeq.length) {
      topLeft.addEventListener("click", topLeftFunc);
      topRight.addEventListener("click", topRightFunc);
      bottomRight.addEventListener("click", bottomRightFunc);
      bottomLeft.addEventListener("click", bottomLeftFunc);
      clearInterval(turnInterval);
      // this 'if' statement is called if the game is not over
      // needed this statement to fix a bug I encountered when the game would end but this timer was called when it wasn't needed
      if (!gameOver) {
        // if the game was not over at the last turn, then this line sets a time limit for the player to repeat the signal
        // if the player does not repeat the signal within the 5 sec time limit, the youLose function is called to end the game
        // I reference JK's code for this
        roundTimerControl = setTimeout(youLose, roundTimeSeconds);
      }
    }
  }, speed);
};

// this function checks the accuracy of the playerSeq against simonsSeq
check = function () {
  // for loop iterates over simonsSeq array
  for (let i = 0; i < simonsSeq.length; i++) {
    // if both arrays match, the currentScore is udpated to the length of the playerSeq array as this is the number of correctly
    // inputted signals achieved on the current (last) game
    if (simonsSeq[i] == playerSeq[i]) {
      document.getElementById("currentScore").innerHTML = playerSeq.length;
      // if there is a mismatch the game is over, currentScore is reset to the last correct round the player achieved
      // simonsSeq is reset to prevent any additional incorrect flashes
    } else if (simonsSeq[i] != playerSeq[i]) {
      youLose();
      document.getElementById("currentScore").innerHTML = simonsSeq.length - 1;
      simonsSeq = [];
    }
  }
};

// function that generates a random number, rounds it to the nearest whole number between 0-3 inclusive
// adds this value to the simonsSeq array
generateRandomNumber = function () {
  randomNum = Math.floor(Math.random() * 4);
  simonsSeq.push(randomNum);
};

// function called by event listeners linked to the 4 buttons
// pass into the function the id of the button clicked
// the function then changes the color of the button clicked to a lighter color depending on the button clicked
// this change is then reverted by the timeout function after half a second (gives the effect of a flash)
addFlash = function (id) {
  if (id == 0) {
    document.getElementById(id).style.background = "lime";
    setTimeout(function () {
      document.getElementById(id).style.background = "darkgreen";
    }, 500);
  }
  if (id == 1) {
    document.getElementById(id).style.background = "red";
    setTimeout(function () {
      document.getElementById(id).style.background = "darkred";
    }, 500);
  }
  if (id == 2) {
    document.getElementById(id).style.background = "deepskyblue";
    setTimeout(function () {
      document.getElementById(id).style.background = "darkblue";
    }, 500);
  }
  if (id == 3) {
    document.getElementById(id).style.background = "yellow";
    setTimeout(function () {
      document.getElementById(id).style.background = "goldenrod";
    }, 500);
  }
};

// function called if the game is over either because the player did not repeat the signal in time, or
// because they repeated an incorrect sequence
youLose = function () {
  // removes the event listener for the duration of the flashes, is added back after
  startButton.removeEventListener("click", play);
  // changes gameOver to true, needed to allow conditional functionality of other buttons
  gameOver = true;
  // this 'if' statement updates the highScore to the currentScore of the game just finished (numebr of correctly inputted signals)
  // provided it is higher than the current highScore
  if (document.getElementById("highScore").innerHTML < simonsSeq.length - 1) {
    document.getElementById("highScore").innerHTML = simonsSeq.length - 1;
  }
  // these timeouts will flash all the buttons once every second over 5 seconds for a total of 5 flashes as per requirements
  // I used this approach opposed to the setInterval because setInterval was not working as I wanted it to
  setTimeout(function () {
    addFlash(0);
    addFlash(1);
    addFlash(2);
    addFlash(3);
  }, 1000);
  setTimeout(function () {
    addFlash(0);
    addFlash(1);
    addFlash(2);
    addFlash(3);
  }, 2000);
  setTimeout(function () {
    addFlash(0);
    addFlash(1);
    addFlash(2);
    addFlash(3);
  }, 3000);
  setTimeout(function () {
    addFlash(0);
    addFlash(1);
    addFlash(2);
    addFlash(3);
  }, 4000);
  setTimeout(function () {
    addFlash(0);
    addFlash(1);
    addFlash(2);
    addFlash(3);
  }, 5000);
  // this timeout adds the event listener back to the start button so that a new game can be started
  setTimeout(function () {
    startButton.addEventListener("click", play);
  }, 6000);
  // call function to turn light from green => red
  turnOffLight();
};

// changes light from red => green
turnOnLight = function () {
  document.getElementById("lightCircle").style.background = "green";
};

// changes light from green => red
turnOffLight = function () {
  document.getElementById("lightCircle").style.background = "red";
};
