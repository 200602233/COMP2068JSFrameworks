

const mongoose = require("mongoose");

// schema for entries
const schemaObject = {
    firstEntry: {
        type: String,
        required: true
    },
    secondEntry: {
        type: String,
        required: true
    },
    usage: String,
    category: String,
    type: {
        type: String,
        enum: ["Word", "Phrase"],
        required: true
    },
    note: String
}


// create model adn explore
const mongooseSchema = new mongoose.Schema(schemaObject);
module.exports = mongoose.model("Project", mongooseSchema);