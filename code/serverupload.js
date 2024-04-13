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
        // if (
        //     file.mimetype === "image/jpeg" ||
        //     file.mimetype === "image/png" ||
        //     file.mimetype === "image/jpg"
        // ) {
        //     done(null, true);
        // } else {
        //     //prevent the upload
        //     var newError = new Error("File type is incorrect");
        //     newError.name = "MulterError";
        //     done(newError, false);
        // }
        done(null, true);  // can now accept and store all files
    },
});

const uploadToS3 = (fileData,filename) => {
    // console.log(fileData);
    // console.log(filename);
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            // Key: `${Date.now().toString()}_${fileData.originalname}`, // Add original file name to the Key
            // Key: filename,
            Key:`EMRI_audio_files/DASS_39/Document_query/${filename}`,
            Body: fileData,
            // ACL: 'public-read', // Make the file public, so you can access it via URL
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
            // Key: `${Date.now().toString()}_${fileData.originalname}`, // Add original file name to the Key
            // Key: filename,
            Key:`EMRI_audio_files/DASS_39/Message_files/${filename}`,
            Body: fileData,
            // ACL: 'public-read', // Make the file public, so you can access it via URL
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



app.post("/upload_documents", upload.single("image"), async (req, res) => {
    if (req.file) {
        await uploadToS3(req.file.buffer,req.file.originalname);
    }
    res.send({
        msg: "File uploaded successfully!",
    });
});
app.get("/get_documents", async (req, res) => {
    try {
        const files = await listFilesFromS3();
        res.send(files);
        console.log("Number of files:", files.length); // Logging number of files
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});
app.post("/upload_files", upload.single("image"), async (req, res) => {
    if (req.file) {
        await uploadToS3_chatbox(req.file.buffer,req.file.originalname);
    }
    res.send({
        msg: "File uploaded successfully!",
    });
});
app.get("/get_files", async (req, res) => {
    try {
        const files = await listFilesFromS3_chatbox();
        res.send(files);
        console.log("Number of files:", files.length); // Logging number of files
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});


app.get("/get_documents_s/:filename", async (req, res) => {
    const { filename } = req.params;
    try {
        const files = await listFilesFromS3_s(filename);
        if (files && files.length > 0) {
            res.send(files);
        } else {
            res.status(404).send({ error: "File not found" });
        }
    } catch (error) {
        console.error("Error retrieving files:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

const listFilesFromS3_s = (filename) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            Prefix: `EMRI_audio_files/DASS_39/Document_query/${filename}`
        };
        S3.listObjects(params, (err, data) => {
            if (err) {
                console.error("Error listing files from S3:", err);
                return reject(err);
            }
            if (data.Contents.length === 0) {
                // No files found with the specified filename
                return resolve([]);
            }
            const files = data.Contents.map((file) => {
                const fileKey = file.Key.split('/').pop(); // Extract only the file name
                const fileUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${file.Key}`;
                return {
                    name: fileKey,
                    url: fileUrl
                };
            });
            console.log("Files found:", files);
            resolve(files);
        });
    });
};

app.listen(5002)
{
    console.log("Server listening on Port", 5002);
}
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
// });