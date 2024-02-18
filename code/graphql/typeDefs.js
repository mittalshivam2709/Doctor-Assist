const {gql} = require('apollo-server');
// input taken from frontend
module.exports = gql`
type Recipe{
    name: String
    description: String
    createdAt: String
    thumsUp: Int
    thumsDown: Int    
}
input RecipeInput{
    name: String,
    description: String
}

type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(ammount: Int! ): [Recipe]
}

type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
}
`