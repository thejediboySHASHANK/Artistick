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
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const multer = require('multer')
const fs = require('fs')
const mime = require('mime-types')

require("dotenv").config()
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sjdhsjd434jh4j5j4k5h4kj5h4jk5';
const bucket = 'shawshank-artistick-webapp'

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
    origin: ['http://10.6.129.90:5173', 'localhost:5173'],
    // origin: 'http://192.168.237.65:5173',

    // origin: '*',

}));

// console.log (process.env.MONGO_URL);

async function uploadToS3(path, originalFilename, mimetype) {
    const client = new S3Client({
        region: 'ap-south-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    })
    const parts = originalFilename.split('.')
    const ext = parts[parts.length-1]
    const newFilename = Date.now() + '.' + ext
    const data = await client.send(new PutObjectCommand({
        Bucket : bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read'
    }))
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`
}

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData)
        })
    })
}
app.get('/test', (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    res.json('test ok')
});

app.post('/register', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
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
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
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
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
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
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: '/tmp/' + newName,
    })
    const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName))
    res.json(url)
})

const photosMiddleware = multer({dest: '/tmp'})
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname, mimetype} = req.files[i]
        const url = await uploadToS3(path, originalname, mimetype)
        uploadedFiles.push(url)
    }
    res.json(uploadedFiles)
})

app.post('/places', (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const {token} = req.cookies
    const {
        title, address, addedPhotos,
        description, perks, visibility, extraInfo, rank
    } = req.body
    const price = 50
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const PlaceDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos,
            description, perks, visibility, extraInfo, price, rank

        })
        res.json(PlaceDoc)
    })

})

app.get('/user-designs', (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData
        res.json(await Place.find({owner: id}))
    })

})
// app.get('/places/:id', async (req, res) => {
//     const {id} = req.params
//     res.json(await Place.find(id))
// })
app.get('/places/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const {id} = req.params
    res.json(await Place.findById(id))
})
app.put('/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
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

app.put('/places/:id/views', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const placeId = req.params.id;

    try {
        const placeDoc = await Place.findById(placeId);
        placeDoc.views += 1;
        await placeDoc.save();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
app.put ('/places/:id/sales', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const productId = req.params.id
    const {sales} = req.body
    try {
        const productDoc = await Place.findById(productId)
        productDoc.sales = sales
        await productDoc.save()
        res.sendStatus(200)
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

app.get('/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    res.json(await Place.find({visibility: 'yes'}))
})
app.get ('/places/cat/:category', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const {category} = req.params
    const regex = new RegExp(category, 'i');
    const places = await Place.find({ extraInfo: regex });
    res.json(places);
})

app.post('/orders', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
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
    mongoose.connect(process.env.MONGO_URL, {serverSelectionTimeoutMS: 30000});
    const userData = await getUserDataFromReq(req)
    res.json(await Booking.find({user:userData.id}).populate('design'))
})


app.listen(4000);

// 3IIjsFeC6Cs9KnlP