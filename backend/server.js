const express = require('express')
const app = express()
const http = require('http').createServer(app);
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;

const SocketService = require('./services/socketService.js')

const upload = multer({ dest: 'uploads/' })
const cloudinaryConfig = require('./config.json').cloudinary
cloudinary.config(cloudinaryConfig)


if (process.env.NODE_ENV !== "production") {
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:5000','http://localhost:8081', 'http://localhost:8082','http://localhost:8086'],
    credentials: true
}));
}
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.post('/upload/cloudinary', upload.single('imgUpload'), (req, res) => {
    cloudinary.uploader.upload(req.file.path,
        function (error, result) {
            res.json(result)
        });
})

const authRoutes = require('./api/auth/AuthRoutes')
const userRoute = require('./api/user/UserRoutes')
const lessonRoute = require('./api/lesson/LessonRoutes')
const filterRoutes = require('./api/filter/FilterRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoute)
app.use('/api/lesson', lessonRoute)
app.use('/api/filter', filterRoutes)

SocketService.setup(http);

// // serve stastic files from public to heroku
// app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
  }

  const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Hello World!' + port))

http.listen(port, () => console.log(`Example app listening on port ${port}!`))

