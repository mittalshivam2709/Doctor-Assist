const {gql} = require('apollo-server')
// token added to user for rgaphql access
module.exports = gql`
type User{
    username: String!
    password: String!
    token: String 
}

input UserInput{
    username: String!
    password: String!
}
extend type Query{
    getUser(ID: ID!): User!
}

extend type Mutation{
    addUser(userInput: UserInput!): User!
    loginUser(userInput: UserInput!): User!

}

`