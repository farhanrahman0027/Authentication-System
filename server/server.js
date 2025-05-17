import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// Load environment variables
dotenv.config();

// Create Express app
const app = express();

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Auth API is running');
});

// Connect to MongoDB and start server
const startServer = async (port) => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/auth-system';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}...`);
        startServer(port + 1);
      }
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;
startServer(PORT);