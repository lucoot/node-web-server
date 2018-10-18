const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()

});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()

   

});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append log');
        }

    });

    next();
});


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });



app.get('/', (req, res) => {

    //res.send('<h1>Hello Express</h1>');
   // res.send({
       // name: 'Otis',
       // animal: 'dog'


      
        res.render('home.hbs', {
        pageTitle: 'Le Home Page',
        welcomeMessage : 'This is a welcome message',
        currentYear: new Date().getFullYear()
    });
    


});


app.get('/about', (req, res) => {
    var answer = parseInt(req.query.key) + 2;
   // res.send(`The result of the math is  ${answer}`);
    res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
});


});


app.get('/maintenance', (req, res) => {
    var answer = parseInt(req.query.key) + 2;
   // res.send(`The result of the math is  ${answer}`);
    res.render('about.hbs', {
    pageTitle: 'Maint Page',
    welcomeMessage : 'Down for Maintenance',
    currentYear: new Date().getFullYear()
});


});



app.listen(port, () => {console.log('server is up');});