const AWS = require("aws-sdk");
let multer = require("multer");
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const { resolve } = require("path-browserify");
const corsList = {
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://10.1.132.176:3001"],
};
dotenv.config();
const app = express();
app.use(cors());
const S3_BUCKET = 'tto-asset';
const REGION = 'ap-south-1';
const ACCESS_KEY = 'AKIA3BOLL3RQW7VZIF5X';
const SECRET_ACCESS_KEY = '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';
const awsConfig = {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
};

const S3 = new AWS.S3(awsConfig);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let upload = multer({
    // storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: function (req, file, done) {
        done(null, true);  // can now accept and store all files
    },
});

const uploadToS3 = (fileData,filename) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Key:`EMRI_audio_files/DASS_39/Document_query/${filename}`,
            Body: fileData,
            // ACL: 'public-read', // Make the file public, so you can access it via URL
        };
        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log(data);
            return resolve(data);
        });
    });
};

const listFilesFromS3 = () => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Prefix: 'EMRI_audio_files/DASS_39/Document_query/'
        };
        S3.listObjects(params, (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            const files = data.Contents.map((file) => {
                // const fileKey = file.Key.replace('emrifol/');   // name of file
                const fileKey = file.Key.split('/').pop(); // Extract only the file name
                const fileUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${file.Key}`;
                return {
                    name: fileKey,
                    url: fileUrl
                };
            });
            console.log(files);
            resolve(files);
        });
    });
}; 
const uploadToS3_chatbox = (fileData,filename) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Key:`EMRI_audio_files/DASS_39/Message_files/${filename}`,
            Body: fileData,
            // ACL: 'public-read', // Make the file public, so you can access it via URL
        };
        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            console.log(data);
            return resolve(data);
        });
    });
};

const listFilesFromS3_chatbox = () => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Prefix: 'EMRI_audio_files/DASS_39/Message_files/'
        };
        S3.listObjects(params, (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            const files = data.Contents.map((file) => {
                // const fileKey = file.Key.replace('emrifol/');   // name of file
                const fileKey = file.Key.split('/').pop(); // Extract only the file name
                const fileUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${file.Key}`;
                return {
                    name: fileKey,
                    url: fileUrl
                };
            });
            console.log(files);
            resolve(files);
        });    
    });    
};     


const deleteFilesFromS3 = (prefix) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Prefix: prefix
        };
        S3.listObjectsV2(params, (err, data) => {
            if (err) {
                console.error("Error listing files from S3:", err);
                return reject(err);
            }
            if (data.Contents.length === 0) {
                // No files found
                return resolve(0);
            }
            const deleteParams = {
                Bucket: S3_BUCKET,
                Delete: {
                    Objects: data.Contents.map(({ Key }) => ({ Key })),
                },
            };
            S3.deleteObjects(deleteParams, (err, data) => {
                if (err) {
                    console.error("Error deleting files from S3:", err);
                    return reject(err);
                }
                console.log("Successfully deleted files:", data.Deleted.length);
                resolve(data.Deleted.length);
            });
        });
    });
};

const deleteFileFromS3 = (key) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Key: key
        };
        S3.deleteObject(params, (err, data) => {
            if (err) {
                console.error(`Error deleting file ${key} from S3:`, err);
                return reject(err);
            }
            console.log(`Successfully deleted file ${key} from S3`);
            resolve();
        });
    });
};  


// To upload documents 
app.post("/upload_documents", upload.single("image"), async (req, res) => {
    if (req.file) {
        await uploadToS3(req.file.buffer,req.file.originalname);
    }    
    res.send({
        msg: "Document uploaded successfully!",
    });    
});    
// to fetch all documents
app.get("/get_documents", async (req, res) => {
    try {
        const files = await listFilesFromS3();
        res.send(files);
        console.log("Number of documents:", files.length); // Logging number of files
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }    
});    
// to upload file (one at a time)
app.post("/upload_files", upload.single("image"), async (req, res) => {
    if (req.file) {
        await uploadToS3_chatbox(req.file.buffer,req.file.originalname);
    }    
    res.send({
        msg: "File uploaded successfully!",
    });        
});        
// to fetch all files
app.get("/get_files", async (req, res) => {
    try {
        const files = await listFilesFromS3_chatbox();
        res.send(files);
        console.log("Number of files:", files.length); // Logging number of files
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }        
});      
// to delete all documents  
app.delete("/delete_documents", async (req, res) => {
    try {
        const deletedCount = await deleteFilesFromS3('EMRI_audio_files/DASS_39/Document_query/');
        res.send({ msg: `Successfully deleted ${deletedCount} documents.` });
    } catch (error) {
        console.error("Error deleting documents:", error);
        res.status(500).send({ error: "Internal server error" });
    }        
});      
// to delete all files  
app.delete("/delete_files", async (req, res) => {
    try {
        const deletedCount = await deleteFilesFromS3('EMRI_audio_files/DASS_39/Message_files/');
        res.send({ msg: `Successfully deleted ${deletedCount} files.` });
    } catch (error) {
        console.error("Error deleting files:", error);
        res.status(500).send({ error: "Internal server error" });
    }        
});        
// to delete a file with a specific name
app.delete("/delete_file/:filename", async (req, res) => {
    const filename = req.params.filename;
    const prefix = 'EMRI_audio_files/DASS_39/Message_files/';
    try {
        const deletedCount = await deleteFileFromS3(prefix + filename);
        res.send({ msg: `Successfully deleted file: ${filename}` });
    } catch (error) {
        console.error(`Error deleting file ${filename}:`, error);
        res.status(500).send({ error: "Internal server error" });
    }    
});    
// to delete a document with a specific name
app.delete("/delete_document/:filename", async (req, res) => {
    const filename = req.params.filename;
    const prefix = 'EMRI_audio_files/DASS_39/Document_query/';
    try {
        const deletedCount = await deleteFileFromS3(prefix + filename);
        res.send({ msg: `Successfully deleted document: ${filename}` });
    } catch (error) {
        console.error(`Error deleting Document ${filename}:`, error);
        res.status(500).send({ error: "Internal server error" });
    }    
});    

app.listen(5002)
{
    console.log("Server listening on Port", 5002);
}

// To upload mutiple files:  

//   app.post("/upload-multiple", upload.array("images", 1), async (req, res) => {
    //     // console.log(req.files);
    
    //     if (req.files && req.files.length > 0) {
        //         for (var i = 0; i < req.files.length; i++) {
            //             // console.log(req.files[i]);
            //             await uploadToS3(req.files[i].buffer);
            //         }
            //     }
            
            //     res.send({
                //         msg: "Successfully uploaded " + req.files.length + " files!",
//     });
                
                // To fetch all files :-
                
                // const listFilesFromS3 = () => {
                //     return new Promise((resolve, reject) => {
                //         const params = {
                //             Bucket: S3_BUCKET,
                //         };
                //         S3.listObjectsV2(params, (err, data) => {
                //             if (err) {
                //                 console.log(err);
                //                 return reject(err);
                //             }
                //             const files = data.Contents.map((file) => {
                //                 const fileKey = file.Key;   // name of file
                //                 const fileUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${fileKey}`;
                //                 return {
                //                     name: fileKey,
                //                     url: fileUrl
                //                 };
                //             });
                //             const folders = data.CommonPrefixes.map((prefix) => {
                //                 const folderKey = prefix.Prefix.slice(0, -1); // Remove trailing '/'
                //                 return {
                //                     name: folderKey,
                //                     url: `https://${S3_BUCKET}.s3.amazonaws.com/${folderKey}`,
                //                     type: "folder"
                //                 };
                //             });
                //             const allItems = [...files, ...folders];
                //             console.log(allItems);
                //             resolve(allItems);
                //         });
                //     });
                // };
                
                
                // To fetch folders  :-
                
                // const listFilesFromS3 = () => {
                //     return new Promise((resolve, reject) => {
                //         const params = {
                //             Bucket: S3_BUCKET,
                //             Delimiter: '/' // Set delimiter to '/' to only get folders
                //         };
                //         S3.listObjectsV2(params, (err, data) => {
                //             if (err) {
                //                 console.log(err);
                //                 return reject(err);
                //             }
                //             const folders = data.CommonPrefixes.map((prefix) => {
                //                 const folderKey = prefix.Prefix.slice(0, -1); // Remove trailing '/'
                //                 return {
                //                     name: folderKey,
                //                     url: `https://${S3_BUCKET}.s3.amazonaws.com/${folderKey}`,
                //                     type: "folder"
                //                 };
                //             });
                //             console.log(folders);
                //             resolve(folders);
                //         });
                //     });
                // };
// });