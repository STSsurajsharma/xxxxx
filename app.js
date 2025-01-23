const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // Layout module
// const connectDB = require('./config/db');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection failed:", err));
// Initialize the app
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set the layout to use main.ejs inside the layouts folder
app.set('layout', 'layouts/main'); // Specify the layout file path

// Use express-ejs-layouts for layout handling
app.use(expressLayouts);  // Set up layout handling

// Use bodyParser for form data handling
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));


// Router setup (optional)
const userRouter = require('./server/router/userRoutes');
app.use('/', userRouter);

// Listen on a port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
