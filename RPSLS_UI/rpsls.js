let moves = ["rock","paper","scissors","lizard","spock"]
let computerWins = 0;
let playerWins = 0;
let roundCounter = 0;

function setGame() {
  boxes = document.querySelectorAll('.box').forEach(function setZero(node) {
    var box = node;
    var content = document.createElement('num');
    content.textContent = 0; // use variable name here without using eval in the future.
    box.appendChild(content);
    })};

function addRound() {
  roundCounter ++
  var roundBox = document.getElementById('roundCounter')
  var newRound = document.createElement('num')
  newRound.textContent = roundCounter;
  roundBox.lastChild.replaceWith(newRound);
  roundBox.classList.toggle('playing')
}

function scoreWin(winner) {
  if (winner == "com") {
    if (computerWins >= 5) {fiveGameMatch();}
    else {
    var computerBox = document.getElementById('computerWins')
    var newScore = document.createElement('num')
    newScore.textContent = computerWins;
    computerBox.lastChild.replaceWith(newScore);
    computerBox.classList.toggle('playing')
    }
  }
  else{ 
    if (playerWins >= 5) {fiveGameMatch();}
    else {
    var playerBox = document.getElementById('playerWins')
    var newScore = document.createElement('num')
    newScore.textContent = playerWins;
    playerBox.lastChild.replaceWith(newScore);
    playerBox.classList.toggle('playing')
    }
  }
  addRound()
}

function computerWin() {
 computerWins ++
 scoreWin('com')
 }

 function playerWin() {
  playerWins ++
  scoreWin('player')
  }


function computerPlay() {
  let itemCount = moves.length - 1;
  num = randomNum(0,itemCount)
  return moves[num];
}

function randomNum(start,end) {
  let num = end + 10;
  ceilEnd = Math.ceil((end+1)/10)*10
  while (num >= end || num <= start) {
  num = Math.round(Math.random()*(ceilEnd));
  if (num <= end && num >= start) {
  return num;
    }
  }
}

function gameRound(hp) {
  let cp = computerPlay();
  if (hp === undefined) {return "I did not understand your play of" + hp}
  if (cp == hp) { addRound(); return "It is a draw. We both chose " + hp.replace("spock","Spock")+". "}
  if (cp == "rock") {
      switch (hp) {
        case "paper":
          playerWin();
          return "Paper covers rock.\n\n"
        case "Spock":
          playerWin();
          return "You have vaporized my rock with Spock!\n\n"
        default:
          computerWin();
          console.log ("HP: " + hp + " CPU: " + cp);
          return capitalize(cp) + " beats " + hp + ".\n\n"
    }
  }
   else if (cp == "paper") {
      switch (hp) {
        case "lizard":
          playerWin();
          return "The lizard ate my paper. \n" 
        case "spock":
          computerWin();
          return "My paper disproves Spock.\n\n"
        case "scissors":
          playerWin();
          return "The scissors have cut my paper. \n"
        default:
          computerWin();
          return capitalize(cp) + " beats " + hp + ".\n\n"
    }
  }
    else if (cp == "scissors") {
      switch (hp) {
        case "rock":
          playerWin();
          return "Rock crushes my scissors.\n"
        case "spock":
          playerWin();
          return "My scissors are smashed by Spock!\n\n" 
        default:
          computerWin();
          return capitalize(cp) + " beats " + hp + ".\n\n" 
    }

  }
  else if (cp == "lizard") {
    switch (hp) {
      case "rock":
        playerWin();
        return "Rock crushes my lizard.\n\n" 
      case "scissors":
        playerWin();
        return "Scissors decapitates my lizard! \n\n" 
      case "spock":
        computerWin();
        return "Lizard poisons Spock.\n\n"  
      default:
        computerWin();
        return capitalize(cp) + " beats " + hp + ".\n\n" 
  }

}
else if (cp == "spock") {
  switch (hp) {
    case "paper":
      playerWin();
      return "Your paper disproves Spock.\n\n"
    case "lizard":
      playerWin();
      return "Your lizard poisons Spock!\n\n"
    case "rock":
      computerWin();
      return "Spock vaporizes your rock.\n\n"
    case "scissors":
      computerWin();
      return "Spock Smashes your scissors. \n\n"
    default:
      console.log ("HP: " + hp + " CPU: " + cp);
      return "Red shirt dies. The choice " + hp + " found something broke.\n\n\n";
    }
}
   else {
    console.log ("HP: " + hp + " CPU: " + cp);
    return "KHAN!!!" + hp + " " + cp + " found something broke.\n\n\n";
   }
}

function returnWin(winner) {
  var scoreBox = document.querySelector('.score');
  var winBox = document.querySelector('.win');
  
  if (winBox === null) {     
    const content = document.createElement('div');
    content.classList.add('win');
    content.textContent = winner;
    scoreBox.appendChild(content);
  }
  else{
    
    winBox.lastChild.replaceWith(winner);
  }
}

function fiveGameMatch() {
  if (computerWins < playerWins) {
  
    window.alert("Fasinating, you have defeated me.\nComputer Score: " + computerWins + "\nHuman Score: " + playerWins + "\n\n");
  }
  else {
    window.alert("One day the game may be yours, today is not that day.\nComputer Score: " + computerWins + "\nHuman Score: " + playerWins + "\n\n");}
  }

function alertButton(e) {
  hp = `${this.value}`;
  node = this.firstElementChild;
  node.classList.toggle('playing')
  let gr = gameRound(hp);
  returnWin(gr);
 }
 
 
 function eventKey(e) {
   var div = document.querySelector(`.key[data-key="${e.keyCode}"`);
   var play = div.querySelector('.play')
   hp = play.innerText.toLowerCase()
   div.classList.toggle('playing');
   let gr = gameRound(hp);
   returnWin(gr);
 };

function capitalize(play) {
return play.charAt(0).toUpperCase() + play.slice(1)
}

function removeTransition(e) {
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const buttons= document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', alertButton));

document.addEventListener("keydown", eventKey);

const allkeys = document.querySelectorAll('.key');
allkeys.forEach(key => key.addEventListener('transitionend', removeTransition));


const allBox = document.querySelectorAll('.box');
allBox.forEach(box => box.addEventListener('transitionend', removeTransition));