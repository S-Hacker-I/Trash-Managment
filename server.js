require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const reportRoutes = require('./routes/reports');
const Activity = require('./models/Activity');
const TrashRoute = require('./routes/trash.routes');
const logs = require('./routes/logs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Public Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Admin Pages
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'dashboard.html'));
});

app.get('/admin/reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'reports.html'));
});

app.get('/admin/logs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'logs.html'));
});

app.get('/admin/trash', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'Trash.html'));
});

// Employee Pages
app.get('/employee/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'employee', 'dashboard.html'));
});

app.get('/employee/report', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'employee', 'report.html'));
});


//resident
app.get('/Resident/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Resident', 'dashboard.html'));
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware to log activity
app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await Activity.create({ user: decoded.id, action: `${req.method} ${req.originalUrl}` });
    } catch (err) {
      // ignore
    }
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/logs', logs);
app.use('/api', TrashRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));