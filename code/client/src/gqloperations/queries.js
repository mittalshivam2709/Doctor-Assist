import {gql} from '@apollo/client'

export const FETCH_MESSAGES = gql`
query FetchMessage($sender: ID!, $receiver: ID!) {
  fetchMessage(sender: $sender, receiver: $receiver) {
    sender
    content
    receiver
  }
}
`

export const FETCH_NUMBER = gql`
query Query {
  getNumberList {
    numbers
  }
}
`