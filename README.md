To run the code, follow the instructions below,


Go to `code` directory, open a terminal and enter the following

`npm i`

Go to `server.js` and change the mongoose connect argument from `process.env.MONGO_URI` to 

`mongodb+srv://dass39:dass39@emri.vubkrrz.mongodb.net/?retryWrites=true&w=majority`

And then,

`nodemon server.js`

Now the server is running, to make GraphQL queries, go to `http://localhost:5001/graphql` to use the ApolloClient for doing so.

Next, open a new terminal and cd to the `client` directory and run the following commands

`npm i`

`npm run start`

the supported links are `/` which navigates to the Login page, but for development, you may navigate to `/home` directly since the default admin is logged in already. Make sure the port you are using is `3000` for running the client. Otherwise change the `cors` origin URL.

You may navigate to `emt dummy 2` and follow the same instructions as above and run the code on port `3001` to chat with a dummy EMT.
