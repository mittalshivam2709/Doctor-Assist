const {gql} = require('apollo-server')

module.exports = gql`
type User{
    username: String!
    password: String!
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

}

`