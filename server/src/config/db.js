const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri || mongoUri === 'memory') {
      console.log('⚡ Initializing in-memory MongoDB database instance...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('✅ In-Memory MongoDB running at:', mongoUri);
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Graceful fallback to avoid app crash
    try {
      console.log('⚡ Retrying with fallback MongoMemoryServer...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const fallbackUri = mongoServer.getUri();
      const conn = await mongoose.connect(fallbackUri);
      console.log(`✅ Fallback MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (fallbackError) {
      console.error('❌ Failed to launch fallback DB:', fallbackError.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
