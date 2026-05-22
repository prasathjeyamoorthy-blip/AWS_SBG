require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const phaseRoutes = require('./routes/phaseRoutes');

// Initialize app
const app = express();

// Connect to MongoDB database
connectDB();

// Middlewares
app.use(cors()); // Allow requests from front-end applications
app.use(express.json()); // Built-in parsing middleware for JSON payloads

// Mount routes
app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/idea', ideaRoutes);
app.use('/phase', phaseRoutes);

// Health Check / Default Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to The Grand Pirate Voyage Backend API!'
  });
});

// 404 Wildcard Error Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found'
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in production-ready mode on port ${PORT}`);
});
