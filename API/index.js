const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
require("dotenv").config()
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sjdhsjd434jh4j5j4k5h4kj5h4jk5';

app.use(express.json());

// app.use(cors({
//     credentials: true,
//     // origin: 'http://127.0.0.1:5173',
//     // 'Access-Control-Allow-Origin': 'http://localhost:5173',
//     origin: 'http://10.7.211.192:5173',
//     // origin: '*',


// }));
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://192.168.94.65:5173',
    // origin: 'http://192.168.237.65:5173',

    // origin: '*',

}));

// console.log (process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 30000 });


app.get('/test', (req, res) => {
    res.json('test ok')
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })

        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e);
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email }).maxTimeMS(30000);
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.status(422).json('pass not Ok')
        }
    } else {
        res.json('not found');
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id });
        })
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName)
})
const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/',''))

    }
    res.json(uploadedFiles)
})

app.listen(4000);

// 3IIjsFeC6Cs9KnlP