
const mongoose = require("mongoose");

// schema
const schemaObject = {
    name: {type: String, required: true},
    dueDate: { type: Date },
    status: {
        type: String,
        enum: ["TO DO", "IN PROGRESS", "DONE"],
        default: "TO DO"
    }
}

// create model adn explore
const mongooseSchema = new mongoose.Schema(schemaObject);
module.exports = mongoose.model("Project", mongooseSchema);