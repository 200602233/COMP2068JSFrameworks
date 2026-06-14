
// step 3: Use the prompt() npm package to ask the user to choose ROCK, PAPER, or SCISSORS and store their response as userSelection
const prompt = require("prompt");
prompt.start();

let userSelection = "";

// ask user rock paper or scissors
console.log("\nRock, Paper, or Scissors? ")

// copilot suggested function
prompt.get(["userSelection"], function (err, result) {
    userSelection = result.userSelection.toUpperCase(); // made uppercase for easier comparing

   
    // step 4: Use the Math.random() function to generate a number as computerSelection: 
    // 0.00 - 0.34 => PAPER
    // 0.35 - 0.67 => SCISSORS
    // 0.68 - 1.00 => ROCK
    let randomNum = Math.random()
    let computerSelection;

    if(randomNum >= 0.0 || randomNum <= 0.34){
        computerSelection = "PAPER";
    }
    else if(randomNum >= 0.35 || randomNum <= 0.67){
        computerSelection = "SCISSORS";
    } else if (randomNum >= 0.68 || randomNum <= 1.00){
        computerSelection = "ROCK";
    }


    // step 5: Display both the userSelection and computerSelection variables using console.log()
    console.log("\nYou chose: ", userSelection);
    console.log("Opponent chose: ", computerSelection);

    
    // step 6:
    // Use decision structures to determine who wins the game using regular Rock, Paper, Scissors rules
    // Use either if or switch

    //step 7:
    // Display the outcome of the game:
    // "User Wins"
    // "Computer Wins"
    // "It's a tie"
    if (userSelection === computerSelection) {
    console.log("\nIt's a tie\n");
    }
    else if (userSelection === "ROCK" && computerSelection === "SCISSORS") {
        console.log("\nUser Wins\n");
    }
    else if (userSelection === "PAPER" && computerSelection === "ROCK") {
        console.log("\nUser Wins\n");
    }
    else if (userSelection === "SCISSORS" && computerSelection === "PAPER") {
        console.log("\nUser Wins\n");
    }
    else if (userSelection === "ROCK" && computerSelection === "PAPER") {
        console.log("\nComputer Wins\n");
    }
    else if (userSelection === "PAPER" && computerSelection === "SCISSORS") {
        console.log("\nComputer Wins\n");
    }
    else if (userSelection === "SCISSORS" && computerSelection === "ROCK") {
        console.log("\nComputer Wins\n");
    }
});