const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const folderRoutes = require('./routes/folder.routes');
app.use('/api', folderRoutes);

const documentRoutes = require('./routes/document.routes');
app.use('/api', documentRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('API is working...');
});

module.exports = app;
