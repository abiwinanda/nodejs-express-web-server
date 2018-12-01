const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  next();
});

// Uncomment these to show the maintenance page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('uppercase', (text) => {
  return text.toUpperCase();
});

// application routes
app.get('/', (req, res) => {
  var viewData = {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the website'
  };

  res.render('home.hbs', viewData);
});

app.get('/about', (req, res) => {
  var viewData = {
    pageTitle: 'About Page',
  };

  res.render('about.hbs', viewData);
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Sample error page'
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
