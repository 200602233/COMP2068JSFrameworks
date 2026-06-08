
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


// step 6: Use decision structures to determine who wins the game using regular Rock, Paper, Scissors rules
//Use either if or switch

// step 7: Display the result of the game in the console 

// if user and computer match
if (userSelection === computerSelection) {
    console.log("It's a tie!");
} 

// if user picks rock and comp picks scissors or paper and their outcomes
else if (userSelection === "ROCK"){
    // if comp picks scissors
    if (computerSelection === "SCISSORS") {
        console.log("User Wins");
    } 
    // if comp picks paper
    else {
        console.log("Computer Wins");
    }
} 

// if user picks paper and comp picks rock or scissors and their outcomes
else if (userSelection === "PAPER") {
    // if comp picks rock
    if (computerSelection === "ROCK") {
        console.log("User Wins");
    } 
    // if comp picks scissors
    else {
        console.log("Computer Wins");
    } 
} 

// if usr picks scissors and comp picks paper or rock and their outcomes
else if (userSelection === "SCISSORS") {
    // if comp picks paper
        if (computerSelection === "PAPER") {
            console.log("User Wins");
        } 
        // if comp picks rock
        else {
            console.log("Computer Wins");
        }
    }

    // no validation for user input is asked

