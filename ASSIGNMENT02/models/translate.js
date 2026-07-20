const mongoose = require("mongoose");

// translation in add
const entrySchema = new mongoose.Schema({
    spanish: String,
    english: String,
    type: String,
    category: String
});

module.exports = mongoose.model("translate", entrySchema);