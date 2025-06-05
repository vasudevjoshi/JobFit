require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
connectDB();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
// app.use(cors());

app.use('/api/v1/',userRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})