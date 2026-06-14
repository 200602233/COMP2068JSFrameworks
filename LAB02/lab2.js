
//step 3: prompt user to choose rock,paper,or scissors and store the result in a variable called userSelection
const prompt = require("prompt");
prompt.start();

let userSelection = "";

// ask user rock paper or scissors
console.log("\nRock, Paper, or Scissors? ")

// steo 4
prompt.get(["userSelection"], function (err, result) {
    // step 5
    userSelection = result.userSelection.toUpperCase(); // made uppercase for easier comparing

    //step 6 
    let randomNum = Math.random()
    let computerSelection;

    //step 7
    if(randomNum <= 0.34){
        computerSelection = "PAPER";
    }
    else if(randomNum <= 0.67){
        computerSelection = "SCISSORS";
    } else{
        computerSelection = "ROCK";
    }

    //step 8
    console.log("\nYou chose: ", userSelection);
    console.log("Opponent chose: ", computerSelection);

    //step 9
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