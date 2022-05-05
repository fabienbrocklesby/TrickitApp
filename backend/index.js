const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const host = "0.0.0.0"
const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.use(cors({
  origin: '*',
}));

app.use('/api/tricks', require('./routes/trickRoutes'));
app.use('/api/songs', require('./routes/songRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, host, () => console.log(`Server started on port ${port}`));
