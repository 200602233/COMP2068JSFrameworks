

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
    language: {
        type: String,
        required: true,
        enum: ["en", "es"]
    },
    usage: {
        english: String,
        spanish: String
    },
    category: {
        english: String,
        spanish: String
    },
    type: {
        type: String,
        enum: ["Word", "Phrase"],
        required: true
    },
    note: {
        english: String,
        spanish: String
    }
}


// create model adn explore
const mongooseSchema = new mongoose.Schema(schemaObject);
module.exports = mongoose.model("Project", mongooseSchema);