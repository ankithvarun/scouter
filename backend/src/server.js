const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:80', 'http://localhost:5000', 'http://localhost:3000', 'http://localhost'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Debug environment variables
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URL:', process.env.MONGO_URL);

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increased timeout to 10s
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

// Function to connect to MongoDB with retries
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not set');
    }
    
    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URL, mongooseOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Connection details:', {
      url: process.env.MONGO_URL,
      options: mongooseOptions
    });
    return false;
  }
};

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      console.log('Database not connected, attempting to connect...');
      const connected = await connectDB();
      if (!connected) {
        return res.status(503).json({
          status: 'error',
          message: 'Database connection failed',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
});

// Initial MongoDB connection
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Handle MongoDB connection errors
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  // Attempt to reconnect
  connectDB();
});

// Routes
app.use('/api/games', require('./routes/games'));
app.use('/api/players', require('./routes/players'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 