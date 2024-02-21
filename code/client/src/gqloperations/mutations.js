import {gql} from '@apollo/client'

export const LOGIN_USER = gql`
mutation LoginUser($userInput: UserInput!) {
  loginUser(userInput: $userInput) {
    username
    password
    token
    id
  }
}
`