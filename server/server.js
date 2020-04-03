const express = require('express');
const dotenv = require('dotenv');
const colorse = require('colors');
const connectionDB = require('./config/db');
const cors = require('cors');
// Load Env vars
dotenv.config({ path: './config/config.env'});

// Connect to database
connectionDB();

const app = express();

// Cors
app.use(cors());

// BodyParser
app.use(express.json());

// Routes files
// const tasks = ;

// Mount routers
app.use('/api/v1/tasks/', require('./routes/tasks'));


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server booming on port ${PORT}`.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
})
