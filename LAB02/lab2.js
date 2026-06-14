
//step 3: prompt user to choose rock,paper,or scissors and store the result in a variable called userSelection
const prompt = require("prompt");
prompt.start();

let userSelection = "";

// steo 4
prompt.get(["userSelection"], function (err, result) {
    // step 5
    userSelection = result.userSelection;

    //step 6 
    let randomNum = Math.random()
    let computerSelection;

    //step 7
    if(randomNum <= 0.34){
        computerSelection = "Paper";
    }
    else if(randomNum <= 0.67){
        computerSelection = "Scissors";
    } else{
        computerSelection = "Rock";
    }

    
});