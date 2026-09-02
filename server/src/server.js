const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedDatabase = require('./data/seedData');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root API Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: '✨ Welcome to StyleSync AI - AI-Powered Boutique & Stylist REST API',
    version: '1.0.0',
    documentation: 'See README.md for endpoint specifications',
    status: 'Healthy',
  });
});

// API Routes Mounting
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/stylist', require('./routes/stylistRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: `API route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

const startServer = (portToTry) => {
  const server = app.listen(portToTry, () => {
    console.log(`=================================================`);
    console.log(`✨ StyleSync AI Server running on port ${portToTry}`);
    console.log(`🌐 Base URL: http://localhost:${portToTry}`);
    console.log(`=================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${portToTry} is in use, trying port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('🔥 Server listen error:', err);
    }
  });
};

// Initialize Database connection then start server
connectDB().then(async () => {
  await seedDatabase();
  startServer(PORT);
});

