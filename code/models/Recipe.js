const {model, Schema} = require('mongoose');

const recipeSchema = new Schema({
    name: String,
    description: String,
    createdAt: String,
    thumsUp: Number,
    thumsDown: Number
});

module.exports = model('Recipe', recipeSchema);