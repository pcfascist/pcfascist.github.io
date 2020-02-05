let moves = ["rock","paper","scissors","lizard","spock"]
var computerWins;
var playerWins;

function computerWin() {
 computerWins ++
 if (computerWins > 1) {return "My win tally is " + computerWins + " games.\n\n\n"}
 else {return "I have won one game.\n\n\n"}
 }

 function playerWin() {
  playerWins ++
  if (playerWins > 1) {return "Your win tally is " + playerWins + " games.\n\n\n"}
  else { return "You have won one game.\n\n\n"}
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

function computerPlay() {
  let itemCount = moves.length - 1;
  num = randomNum(0,itemCount)
  return moves[num];
}

function humanPlay() {
  var humanMove;
  var count;
  while (moves.indexOf(humanMove) == -1) {
  if (count > 0) {
    humanMove = prompt("Try again. What's your move player? (rock, paper, scissors, lizard, Spock)","rock")
    humanMove = humanMove.toLowerCase()
  }
  else {
  count = 0
  humanMove = prompt("What is your move, player? (rock, paper, scissors, lizard, Spock)","rock")
  humanMove = humanMove.toLowerCase()
  count ++
  }
  }
  return humanMove;
}


function gameRound(hp) {
  let cp = computerPlay();
  if (hp === undefined) {return "I did not understand your play of" + hp}
  if (cp == hp) { return "It is a draw. We both chose " + hp.replace("spock","Spock")}
  if (cp == "rock") {
      switch (hp) {
        case "paper":
          return "You have beat me this time! Paper covers rock.\n\n" + playerWin();
        case "Spock":
          return "You have vaporized my rock with Spock!\n\n" + playerWin();
        default:
          computerWin();
          return "I have won this round. " + cp + " beats " + hp + ".\n\n" + computerWin();;
    }
  }
   else if (cp == "paper") {
      switch (hp) {
        case "lizard":
          return "The lizard ate my paper. You win.\n\n" + playerWin();
        case "spock":
          return "My paper disproves Spock. I win.\n\n" + computerWin();;
        case "scissors":
          return "The scissors have cut my paper. You win.\n\n" + playerWin();
        default:
          return "I have won this round. " + cp + " beats " + hp + ".\n\n" + computerWin();
    }
  }
    else if (cp == "scissors") {
      switch (hp) {
        case "rock":
          return "Rock crushes my scissors. You win.\n\n" + playerWin();
        case "spock":
          return "My scissors are smashed by Spock! You win.\n\n" + playerWin();
        default:
          return "I win this round. " + cp + " beats " + hp + ".\n\n" + computerWin();
    }

  }
  else if (cp == "lizard") {
    switch (hp) {
      case "rock":
        return "Rock crushes my lizard. \nYou win.\n\n" + playerWin();
      case "scissors":
        return "Scissors decapitates my lizard! You win.\n\n" + playerWin();
      case "spock":
        return "Lizard poisons Spock. I win.\n\n" + computerWins();
      default:
        return "I have won this round. " + cp + " beats " + hp + ".\n\n" + computerWin();
  }

}
else if (cp == "spock") {
  switch (hp) {
    case "paper":
      return "Your paper disproves Spock. You win.\n\n" + playerWin();
    case "lizard":
      return "Your lizard poisons Spock! You win.\n\n" + playerWin();
    case "rock":
      return "Spock vaporizes your rock. I win.\n\n" + computerWin()
    case "scissors":
      return "Spock Smashes your scissors. I win.\n\n" + computerWin()
    default:
      return "Red shirt dies. The choice" + hp + " found something broke.\n\n\n";
    }
}
   else {
     return "KHAN!!!" + hp + " " + cp + " found something broke.\n\n\n";
   }
}


function fiveGameMatch() {
computerWins = 0
playerWins = 0
while (computerWins < 5 && playerWins < 5) {
let hp = humanPlay();
let gr = gameRound(hp);
window.alert(gr);
}

}
fiveGameMatch();
if (computerWins < playerWins) {
  window.alert("Fasinating, you have defeated me.\nComputer Score: " + computerWins + "\nHuman Score: " + playerWins + "\n\n");
}
else { window.alert("One day the game may be yours, today is not that day.\nComputer Score: " + computerWins + "\nHuman Score: " + playerWins + "\n\n");}
