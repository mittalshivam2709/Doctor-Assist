const { GraphQLClient, gql } = require('graphql-request');

const client = new GraphQLClient('http://localhost:3000');

const query = gql`
  query GetRecipes($ammount: Int!) {
    getRecipes(ammount: $ammount) {
      name
      description
      createdAt
      thumsUp
      thumsDown
    }
  }
`;

const variables = {
  ammount: 1 
};

client.request(query, variables)
  .then(data => {
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
