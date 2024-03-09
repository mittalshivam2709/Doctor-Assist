<h1>EMRI Web App</h1>

This is a web application designed to assist doctors in managing patient vitals, accessing medical documents, and communicating with Emergency Medical Technicians (EMTs) for critical cases. The application is built using React for the frontend and Node.js with GraphQL for the backend.
Features

    Patient Vitals: View vitals of patients assigned to the doctor.
    Document Query: Search for medicines or procedures from uploaded medical documents.
    Live Chat: Communicate with EMT assistants regarding critical cases.

<h2>Setup Instructions</h2>

To run the application, follow these steps:
Backend Setup

    Navigate to the code directory.
    Open a terminal and run npm i.
    Modify server.js:
        Change the MongoDB connection string from process.env.MONGO_URI to "mongodb+srv://dass39:dass39@emri.vubkrrz.mongodb.net/?retryWrites=true&w=majority".
    Start the server by running nodemon server.js.

<h2>Frontend Setup</h2>

    Navigate to the client directory.
    Open a terminal and run npm i.
    Start the frontend server by running npm run start.
    Access the application at http://localhost:3000.

<h2>Live Chat Setup</h2>

    Navigate to the emt dummy 2 directory.
    Open a terminal and run npm i.
    Start the chat server by running npm run start.
    Access the dummy EMT chat at http://localhost:3001.

<h2>Default Login (for Development)</h2>

    Username: admin
    Password: admin

<h2>Usage</h2>

    Navigate to / to access the login page. For development, you may directly navigate to /home.
    Once logged in, you'll be able to view patient vitals, search medical documents, and chat with EMTs.

<h2>Supported Links</h2>

    /: Login page.
    /home: Dashboard for doctors.
    /emt-dummy-2: Chat interface for dummy EMT.

<h2>Note</h2>

    Ensure that the port used is 3000 for the client and 3001 for the EMT chat. Modify CORS origin URL if necessary.

<h2>Contributors</h2>

    Mayank Mittal
    Bassam Adnan
    Shivam Mittal
    Manan Garg
    Uday Bindal

License

This project is licensed under the MIT License.
