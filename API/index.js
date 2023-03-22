const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Place = require('./models/Place')
const Booking = require('./models/Booking')
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
    origin: ['http://10.6.132.182:5173', 'localhost:5173'],
    // origin: 'http://192.168.237.65:5173',

    // origin: '*',

}));

// console.log (process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData)
        })
    })
}
app.get('/test', (req, res) => {
    res.json('test ok')
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

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
    const {email, password} = req.body;
    const userDoc = await User.findOne({email}).maxTimeMS(30000);
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
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id)
            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName)
})
const photosMiddleware = multer({dest: 'uploads/'})
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''))

    }
    res.json(uploadedFiles)
})

app.post('/places', (req, res) => {
    const {token} = req.cookies
    const {
        title, address, addedPhotos,
        description, perks, visibility, extraInfo
    } = req.body
    const price = 50
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const PlaceDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, visibility, extraInfo, price

        })
        res.json(PlaceDoc)
    })

})

app.get('/user-designs', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner: id}))
    })

})

app.get('/places/:id', async (req, res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})
app.put('/places', async (req, res) => {
    const {token} = req.cookies
    const {
        id, title, address, addedPhotos,
        description, perks, visibility, extraInfo
    } = req.body

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id)
        const price = 50
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos,
                description, perks, visibility, extraInfo, price
            })
            await placeDoc.save()
            res.json('ok')
        }
    })
})

app.get('/places', async (req, res) => {
    res.json(await Place.find({visibility: 'yes'}))
})

app.post('/orders', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    const {
        design, numberOfOrders, name, phone, price, deliveryStatus, address, DateOfBooked
    } = req.body
    Booking.create({
        design, numberOfOrders, name, phone, price, user: userData.id, deliveryStatus, address, DateOfBooked
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err;
    })
})



app.get('/orders', async (req, res) => {
    const userData = await getUserDataFromReq(req)
    res.json(await Booking.find({user:userData.id}).populate('design'))
})

app.listen(4000);

// 3IIjsFeC6Cs9KnlP