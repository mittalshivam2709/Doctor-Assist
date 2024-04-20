<h1>EMRI Web App</h1>

- This is a web application designed to assist doctors in managing the treatment of several patients belonging to the 25 ambulances alloted to him using data such as patient vitals, accessing medical documents, and communicating with Emergency Medical Technicians (EMTs) for critical cases.

- The application is built using React for the frontend and Node.js with GraphQL for the backend and for storing files used Amazon S3.

The features being provided are the following :-

1. View Vitals: View vitals of patients which are assigned to the doctor.
2. Document Query: Search for medicines or procedures from uploaded medical documents from admins by the doctors.
3. Live Chat: Communicate with EMT assistants of the ambulances regarding critical cases.
4. Document Uploading : Admins can upload documents on which doctors can query to handle critical cases and also edit/view/delete them.
## Setup Instructions

### Backend Setup:

1. Navigate to the **code** directory.
2. Open a terminal and run `npm i`.
3. Modify `server.js`:
   - Change the MongoDB connection string from `process.env.MONGO_URI` to<br> `'mongodb+srv://dass39:dass39@emri.vubkrrz.mongodb.net/?retryWrites=true&w=majority'`.
4. Start the servers by running `npm run dev`.

### Frontend Setup

1. Navigate to the client directory.
2. Open a terminal and run `npm i`.
3. Start the frontend server by running `npm run start`.
4. Access the application at [http://localhost:3000](http://localhost:3000).

### Live Chat Setup of EMT in an Ambulance

1. Navigate to the emt dummy directory.
2. Open a terminal and run `npm i`.
3. Start the chat server by running `npm run start`.
4. Access the dummy EMT chat at [http://localhost:3001](http://localhost:3001).

### For Login

- **For Doctors:**
  - Email: doctor1@gmail.com
  - Password: doctor1
  (similarly for doctor2, doctor3, and so on)

- **For Admin:**
  - Email: admin1@gmail.com
  - Password: admin1
  (similarly for admin2, admin3, and so on)

## Usage

- Navigate to `/` to access the login page.
- For Signup, go to `/signup` to access the signup page.
- Once logged in, you'll be able to:
  - View patient vitals
  - Search medical documents
  - Chat with EMTs if logged in as a doctor
  - View all documents uploaded already and upload more or delete them if logged in as an admin.

## Supported Links

- `/`: Login page.
- `/signup`: Signup page.
- `/passwordreset`: Password reset page.
- `/home`: Dashboard for doctors and admins.
- `/profile`: Profile page of doctor or admin after login.

## For Interaction with Amazon S3 storage

Also in S3 bucket :-<br>
All documents are in :- 'EMRI_audio_files/DASS_39/Document_query/' folder path<br> All files of chat are in :- 'EMRI_audio_files/DASS_39/Message_files/' folder path.
- **Upload a file:**  
  - Select a POST request and use the API: `http://localhost:5002/upload_files`
  - Choose any file with its field name 'image' for upload.

- **Upload a document:**  
  - Select a POST request and use the API: `http://localhost:5002/upload_documents`
  - Choose any file with its field name 'image' for upload.

- **Fetch all files:**  
  - Select a GET request and use the API: `http://localhost:5002/get_files`

- **Fetch all documents:**  
  - Select a GET request and use the API: `http://localhost:5002/get_documents`

- **Delete all files:**  
  - Select a DELETE request and use the API: `http://localhost:5002/delete_files`

- **Delete all documents:**  
  - Select a DELETE request and use the API: `http://localhost:5002/delete_documents`

- **Delete a specific file:**  
  - Select a DELETE request and use the API: `http://localhost:5002/delete_file/filename` 
  - Replace `filename` with the actual filename in the URL.

- **Delete a specific document:**  
  - Select a DELETE request and use the API: `http://localhost:5002/delete_document/filename` 
  - Replace `filename` with the actual filename in the URL.

Please note that you can also upload multiple files; however, this part is currently commented out in the codebase, allowing only single-file uploads.

<h2>Note</h2>

    Ensure that the port used is 3000 for the client and 3001 for the EMT chat. Modify CORS origin URL if necessary.

## How to Contribute

If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## Authors

- [Shivam Mittal](https://github.com/mittalshivam2709)
- [Manan Garg](https://github.com/manangarg21)
- [Mayank Mittal](https://github.com/mayankmittal29)
- [Bassam Adnan](https://github.com/bassamadnan)
- [Uday Bindal](https://github.com/udaybindal01)
