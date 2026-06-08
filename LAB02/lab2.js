
//step 3: prompt user to choose rock,paper,or scissors and store the result in a variable called userSelection
let userSelection = prompt("Rock, Paper, Scissors? Type your choice below: ");

//step 4: Use Math.random() function to generate a number as computerSelection:
    // a. 0.00 - 0.34 => PAPER
    // b. 0.35 - 0.67 => SCISSORS
    // c. 0.68 - 1.00 => ROCK
let computerSelection = Math.random();
if (computerSelection <= 0.34) {
    computerSelection = "PAPER";
} else if (computerSelection <= 0.67) {
    computerSelection = "SCISSORS";
} else {
    computerSelection = "ROCK";
}

// step 5: Display both the userSelection and computerSelection in the console
console.log("You chose: " + userSelection);
console.log("Opponent chose: " + computerSelection);
