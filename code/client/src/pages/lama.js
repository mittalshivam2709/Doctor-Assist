// import React, { useState } from 'react';
// import { UploadDocument, sendMessage } from '../APIUtils.ts'; // Import your TypeScript file

// function LamaPage() {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [query, setQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       // Call UploadDocument function
//       const response = await UploadDocument('your-auth-token', file, 'your-group-id', 'creation-date');
//       setUploadStatus(response === 'success' ? 'Upload successful' : 'Upload failed');
//     } catch (error) {
//       setUploadStatus('Upload failed');
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       // Call sendMessage function to query the document
//       const results = await sendMessage(query, 'company_group', 'access_token');
//       setSearchResults(results);
//     } catch (error) {
//       // Handle error
//     }
//   };

//   return (
//     <div>
//       <h1>Document Upload and Query Page</h1>
//       <div>
//         <h2>Upload Document</h2>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Upload</button>
//         <p>{uploadStatus}</p>
//       </div>
//       <div>
//         <h2>Query Document</h2>
//         <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
//         <button onClick={handleSearch}>Search</button>
//         <h3>Search Results:</h3>
//         <ul>
//           {searchResults.map((result, index) => (
//             <li key={index}>{result}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default LamaPage;
// import React, { useState } from 'react';
// import { UploadDocument, sendMessage } from '../APIUtils.ts'; // Import your TypeScript file

// function LamaPage() {
//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [query, setQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       // Call UploadDocument function
//       const response = await UploadDocument('your-auth-token', file, 'your-group-id', 'creation-date');
//       setUploadStatus(response === 'success' ? 'Upload successful' : 'Upload failed');
//     } catch (error) {
//       setUploadStatus('Upload failed');
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       // Call sendMessage function to query the document
//       const results = await sendMessage(query, 'company_group', 'access_token');
//       setSearchResults(results);
//     } catch (error) {
//       // Handle error
//     }
//   };

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
//       <h1>Document Upload and Query Page</h1>
//       <div style={{ marginBottom: '20px' }}>
//         <h2>Upload Document</h2>
//         <input type="file" onChange={handleFileChange} style={{ marginBottom: '10px' }} />
//         <button onClick={handleUpload} style={{ marginRight: '10px' }}>Upload</button>
//         <p style={{ color: uploadStatus === 'Upload successful' ? 'green' : 'red' }}>{uploadStatus}</p>
//       </div>
//       <div>
//         <h2>Query Document</h2>
//         <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} style={{ marginBottom: '10px', width: '200px' }} />
//         <button onClick={handleSearch} style={{ marginRight: '10px' }}>Search</button>
//         <h3>Search Results:</h3>
//         <ul>
//           {searchResults.map((result, index) => (
//             <li key={index}>{result}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default LamaPage;
import React, { useState } from 'react';
import { UploadDocument, sendMessage } from '../APIUtils.ts'; // Import your TypeScript file
import './lama.css'; // Import CSS file

function LamaPage() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      // Call UploadDocument function
      const response = await UploadDocument('your-auth-token', file, 'your-group-id', 'creation-date');
      setUploadStatus(response === 'success' ? 'Upload successful' : 'Upload failed');
    } catch (error) {
      setUploadStatus('Upload failed');
    }
  };

  const handleSearch = async () => {
    try {
      // Call sendMessage function to query the document
      const results = await sendMessage(query, 'company_group', 'access_token');
      setSearchResults(results);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="container">
      <h1>Document Upload and Query Page</h1>
      <div className="box">
        <h2>Upload Document</h2>
        <div className="input-box">
          <input type="file" onChange={handleFileChange} />
        </div>
        <button onClick={handleUpload}>Upload</button>
        <p className="upload-status">{uploadStatus}</p>
      </div>
      <div className="box">
        <h2>Query Document</h2>
        <div className="input-box">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button onClick={handleSearch}>Search</button>
        <div className="result-box">
          <h3>Search Results:</h3>
          <ul className="result-list">
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LamaPage;
