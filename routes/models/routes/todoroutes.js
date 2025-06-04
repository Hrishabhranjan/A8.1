const express = require('express');
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.render('index'); // Assuming you're using EJS templating
});

// Define a fallback route
app.use((req, res, next) => {
  res.status(404).render('404'); // Render a 404 page
});