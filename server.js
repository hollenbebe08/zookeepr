const express = require('express');
const {animals} = require('./data/animals.json');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

//instantiate(create) the server
const app = express();

//middleware that instructs the server to make certain files readily available (such as css and js)
app.use(express.static('public'));

//parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());

//this tells the server that any time a client navigates to <ourhost>/api, the app will use the router set up in apiRoutes. 
//If / is the endpoint, the router will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//method to make the server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});