let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};  //here we used || or default operator as default operator only takes the first value if the first one is true and takes the second value if first one is false

//To display score
updateScoreElement();

/*
if(!score) {  //score could be null as we removed it from our local storage we can also use that instead of score === null
  score = {
    Wins: 0,
    Losses: 0,
    Ties: 0
  }
}
*/



// functions for autoplay

let isAutoPlaying = false;
let intervalId;


// const autoPlay = () => {};

function autoPlay() { //here normal function is preferred as it gives hoisting
  if(!isAutoPlaying) { //setInterval() returns a number like an id and we can use this id to stop setInterval.but every time we runs the function it gives different id
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Play';
    intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
  } 
  else {
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


//using addEventListener

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('rock');
  }
  else if(event.key === 'p') {
    playGame('paper');
  }
  else if(event.key === 's') {
    playGame('scissors');
  }
});

//function to compare player move with computer's
function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if(playerMove === 'rock') {
      if(computerMove === 'rock') {
        result = 'Tie.';
      }
      else if(computerMove === 'paper') {
        result = 'You lose.';
      }
      else if(computerMove === 'scissors') {
        result = 'You win.';
      }
    }

    else if(playerMove === 'paper') {
      if(computerMove === 'rock') {
        result = 'You win.';
      }
      else if(computerMove === 'paper') {
        result = 'Tie.';
      }
      else if(computerMove === 'scissors') {
        result = 'You lose.';
      }
    }
     
    else if(playerMove === 'scissors') {
      if(computerMove === 'rock') {
        result = 'You lose.';
      }
      else if(computerMove === 'paper') {
        result = 'You win.';
      }
      else if(computerMove === 'scissors') {
        result = 'Tie.';
      }
    }

    if(result === 'You win.') {
      score.Wins += 1;
    }

    else if(result === 'You lose.') {
      score.Losses += 1;
    }

    else if(result === 'Tie.') {
      score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score)); //can only store string values. and helps to retain value even after refreshing the page

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You 
<img class="move-icon" src="./assets/${playerMove}-emoji.png" alt="">
<img class="move-icon" src="./assets/${computerMove}-emoji.png" alt=""> 
Computer`;

//         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`);
 }

 //function to update score
 function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =     `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`; 
 }

//function to make computer pick a move

function pickComputerMove() {
  let computerMove = '';
      const randomNumber = Math.random();  //Math.random selects a number 0 <= and < 1
    if(randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    }
    else {
      computerMove = 'scissors';
    }
    return computerMove;
  }

