const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs'))); // Serve the docs directory

// Serve index.ejs as the landing page
app.get('/', (req, res) => {
    res.render('index');
});

// Serve app.ejs for the Tableau-To-Go page
app.get('/app', (req, res) => {
    res.render('app');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
