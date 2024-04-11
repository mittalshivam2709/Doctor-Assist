import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const Protocol_sheet = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0].name)
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            // Make a POST request to your Express server
            const response = await axios.post('http://localhost:5002/upload-single', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Log the response from the server
            alert("File uploaded successfully!");
            setSelectedFile(null); // Clear selected file after upload
        } catch (error) {
            console.error('Error uploading file:', error);
            alert("Error uploading file. Please try again.");
        }
    }

    return (
        <div>
            <div>React S3 File Upload</div>
            <div style={{ marginBottom: '10px' }}>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileInput} 
                    style={{ display: 'none' }} 
                />
                <button onClick={handleButtonClick} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Select File
                </button>
            </div>
            {selectedFile && (
                <div>
                    Selected File: {selectedFile.name}
                </div>
            )}
            <button onClick={handleUpload} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Upload to S3
            </button>
        </div>
    );
}

export default Protocol_sheet;
