
//step 3: prompt user to choose rock,paper,or scissors and store the result in a variable called userSelection
const prompt = require("prompt");
prompt.start();

let userSelection = "";

// steo 4
prompt.get(["userSelection"], function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
});