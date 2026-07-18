

const mongoose = require("mongoose");

// schema
const schemaObject = {
    firstEntry: {
        type: String,
        required: true
    },
    secondEntry: {
        type: String,
        required: true
    },
    pronunciation: String,
    usage: String,
    category: String,
    type: {
        type: String,
        enum: ["Word", "Phrase"],
        required: true
    },
    note: String
}
// translation in add
const entrySchema = new mongoose.Schema({
    spanish: String,
    english: String,
    type: String,
    category: String
});

// create model adn explore
const mongooseSchema = new mongoose.Schema(schemaObject);
module.exports = mongoose.model("Project", mongooseSchema);