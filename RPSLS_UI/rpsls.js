let moves = ["rock","paper","scissors","lizard","spock"]
let computerWins = 0;
let playerWins = 0;
let roundCounter = 0;

/* Set game rounds and score to zero at start or restart */
function setGame() {
  document.querySelectorAll('.box').forEach(node => updateNumber(node.getAttributeNode('id').value,0)) /* todo: find a way to not use static zero just because I don't like using a static value here */
};
 
/* Update Score Boxes using targe and new value*/
function updateNumber(target,value) {
  var roundBox = document.getElementById(target)
  var newText = document.createElement('num')
  newText.textContent = value;
  roundBox.lastChild.replaceWith(newText);
  roundBox.classList.toggle('playing')
}

/* Increase round counter and graphic after each play */
function addRound() {
  roundCounter ++
  updateNumber('roundCounter',roundCounter)
}

/* after each round check if a player has won the five games for the match */
function checkWin() {
  if (playerWins == 5 || computerWins == 5) {fiveWinsMatch();} else {addRound();}
}

/* Increment score for computer, check if player has won five games */
function computerWin() {
 computerWins ++
 updateNumber('computerWins',computerWins);
 checkWin();
 }

/* Increment score for human, check if player has won five games */
function playerWin() {
playerWins ++
updateNumber('playerWins',playerWins);
checkWin();
}

/*return a random computer play from 'moves'*/ 
function computerPlay() {
  let itemCount = moves.length - 1;
  num = randomNum(0,itemCount)
  return moves[num];
}

/* Random Number to Select Computer Play */
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

/* Process the round with each player's choice */
function gameRound(hp) {
  let cp = computerPlay();
  if (hp === undefined) {return "I did not understand your play of" + hp}
  if (cp == hp) { addRound(); return "It is a draw. We both chose " + hp.replace("spock","Spock")+". "}
  if (cp == "rock") {
      switch (hp) {
        case "paper":
          playerWin();
          return "Paper covers rock.\n\n"
        case "spock":
          playerWin();
          return "You have vaporized my rock with Spock!\n\n"
        default:
          computerWin();
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
          return "Your scissors have cut my paper. \n"
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



/* Display win after game round */
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

/* reset game after a match winner */
function clearScore() {
  computerWins = 0;
  playerWins = 0;
  roundCounter = 0;
  updateNumber('computerWins',computerWins)
  updateNumber('playerWins',playerWins)
  updateNumber('roundCounter',roundCounter)
 
}

/* Winner Modal Display at the Conclusion of a Match */
function fiveWinsMatch() {
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
  var resultsBody = document.querySelector(".modal-body");
  var resultsHeader = document.querySelector(".modal-header");
  span.onclick = function() {
    modal.style.display = "none";
    while (resultsBody.firstChild) {
      resultsBody.removeChild(resultsBody.lastChild);
    }
    resultsHeader.removeChild(resultsHeader.lastChild);
    clearScore();
  }
  var content = document.createElement('p');
  var contentComputer = document.createElement('p');
  var contentPlayer = document.createElement('p');
  var header = document.createElement('h2');

  if (computerWins < playerWins) {
    header.textContent = "Defeat!";
    content.textContent = "Fasinating, you have defeated me." 
  }
  else {
    header.textContent = "Victory!";
    content.textContent = "One day the game may be yours, today is not that day.";
  }
  resultsHeader.appendChild(header);
  contentComputer.textContent = "Computer Wins: " + computerWins 
  contentPlayer.textContent = "Player Wins: " + playerWins;
  resultsBody.appendChild(content);
  resultsBody.appendChild(contentPlayer);
  resultsBody.appendChild(contentComputer);
  modal.style.display = "block";
};

/* Handle Clicks from user */
function alertButton(e) {
  hp = `${this.value}`;
  node = this.firstElementChild;
  node.classList.toggle('playing')
  let gr = gameRound(hp);
  returnWin(gr);
 }
 
 /* Handle Key press from user */
 function eventKey(e) {
   var div = document.querySelector(`.key[data-key="${e.keyCode}"`);
   var play = div.querySelector('.play')
   hp = play.innerText.toLowerCase()
   div.classList.toggle('playing');
   let gr = gameRound(hp);
   returnWin(gr);
 };

/* Reutrn the play name capitalized for when I haven't created a cleaver win message */
function capitalize(play) {
return play.charAt(0).toUpperCase() + play.slice(1)
}

/* Remove the highlight effect after the transition completes*/
function removeTransition(e) {
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

/* Register Listeners */
const buttons= document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', alertButton));

document.addEventListener("keydown", eventKey);

const allkeys = document.querySelectorAll('.key');
allkeys.forEach(key => key.addEventListener('transitionend', removeTransition));


const allBox = document.querySelectorAll('.box');
allBox.forEach(box => box.addEventListener('transitionend', removeTransition));