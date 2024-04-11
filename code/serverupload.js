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
const S3_BUCKET = 'abcwee';
const REGION = 'us-east-1';
const ACCESS_KEY = 'AKIA6GBMCT6VEDI6PS7P';
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
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            done(null, true);
        } else {
            //prevent the upload
            var newError = new Error("File type is incorrect");
            newError.name = "MulterError";
            done(newError, false);
        }
        // done(null, true);  // can now accept and store all files
    },
});

const uploadToS3 = (fileData) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: S3_BUCKET,
            // Key: `${Date.now().toString()}_${fileData.originalname}`, // Add original file name to the Key
            Key: `${Date.now().toString()}.jpg`,
            Body: fileData,
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
        };
        S3.listObjects(params, (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            const files = data.Contents.map((file) => {
                const fileKey = file.Key;
                const fileUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${fileKey}`;
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


app.post("/upload-single", upload.single("image"), async (req, res) => {
    if (req.file) {
        await uploadToS3(req.file.buffer);
    }
    res.send({
        msg: "File uploaded successfully!",
    });
});
app.get("/get-files", async (req, res) => {
    try {
        const files = await listFilesFromS3();
        res.send(files);
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});
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