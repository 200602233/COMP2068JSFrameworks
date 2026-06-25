const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    spanish: String,
    english: String,
    type: String,
    category: String
});

module.exports = mongoose.model('Entry', entrySchema);