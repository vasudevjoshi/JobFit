require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
const modelRoutes = require('./routes/Model');
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');
connectDB();
app.use(cookieParser());
const allowedOrigins = [
  'https://adorable-tapioca-e0ee6d.netlify.app',
  'http://localhost:5173'
];

app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(fileUpload());

app.use('/api/v1/',userRoutes);
app.use('/api/v1/model', modelRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})