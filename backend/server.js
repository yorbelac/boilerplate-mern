//server.js is the backend source which compiles the server startup instructions, and delegates request handling.

//requires path which allows directory navigation
const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

//fires mongoose's connect to database function in config/db.js
connectDB();

//initialize app
const app = express();
app.use(express.json()); //app can use JSON
app.use(express.urlencoded({ extended: false })); //app can use urlencoded form data

//app.use routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// prod/dev audible
if (process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, '../frontend/build'))); //prod use BUILD
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else { //if in dev throw prod warn
  app.get('/', (req, res) => res.send('Please set to production'));
}

// error handler middleware
app.use(errorHandler);

//app listen
app.listen(port, () => console.log(`Server started on port ${port}`));
