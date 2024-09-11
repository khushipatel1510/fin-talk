const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB.js');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');

const { v2: cloudinary } = require('cloudinary');
const { app, server } = require('./socket/socket.js');
const job = require('./cron/cron.js');
const cors = require('cors');

dotenv.config();
connectDB();
job.start();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(cors({
  origin: 'https://mern-azure-web-app-c5frbpfca7fgfhgv.centralindia-01.azurewebsites.net/api', // frontend URL
  credentials: true
}));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
