const mongoose = require('mongoose');

const todoSchemea = new mongoose.Schema({
    titre: String,
    description: String,
    isDone: Boolean
});



module.exports = mongoose.model("Todo",todoSchemea);