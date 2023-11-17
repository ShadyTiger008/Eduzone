const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');
const { register, login } = require('./controllers/auth'); // Import register and login functions
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const postRoutes = require('./Routes/post');
const { verifyToken } = require('./Middleware/auth');
const { createPost } = require('./controllers/post');
const User = require('./Models/User');
const { users, posts } = require('./data');
const Post = require('./Models/Post');


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// File storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Routes with files
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', upload.single('picture'), createPost); /* verifyToken,*/

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    //   User.insertMany(users);
    //   Post.insertMany(posts);
  })
  .catch((error) => {
    console.error(`Failed to listen on port ${PORT}: ${error.message}`);
  });
