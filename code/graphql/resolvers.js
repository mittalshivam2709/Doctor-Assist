const Recipe = require("../models/Recipe"); // can name anything

module.exports = {
    Query: {
        async recipe(_, {ID}){
            return await Recipe.findByID(ID)
        },
        async getRecipes(_, {ammount}){
            return await Recipe.find().sort({createdAt: -1}).limit(ammount) // most recent x recipes
        }
    },
    Mutation: {
        async createRecipe(_, {recipeInput: {name,description}}){
            const createdRecipe = new Recipe({ //instanc eof recipe model
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0
            })
            const res = await createdRecipe.save(); // save to mongodb
            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_, {ID}){
            const wasDeleted = (await Recipe.deleteOne({_id: ID})).deletedCount;
            return wasDeleted;
        },
        async editRecipe(_, {ID, recipeInput: {name, description}}){
            const wasEdited = (await Recipe.updateOne({_id: ID}, {name: name, description: description})).modifiedCount;
            return wasEdited;
        }
    
    }

}