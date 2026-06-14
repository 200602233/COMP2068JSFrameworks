
//step 3: prompt user to choose rock,paper,or scissors and store the result in a variable called userSelection
const prompt = require("prompt");
prompt.start();

let userSelection = "";

// steo 4
prompt.get(["userSelection"], function (err, result) {
    // step 5
    userSelection = result.userSelection.toUpperCase();

    //step 6 
    let randomNum = Math.random()
    let computerSelection;
    
});