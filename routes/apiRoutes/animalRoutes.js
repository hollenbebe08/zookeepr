//start an instance of Router (app cannot be used since it is/was defined in server.js).
//NOTE: Router allows routes to be declared in any file as long as the proper middleware is used.
const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//route to the animals.json files requests and responses
//Note - the get() method requires both the req and response as arguments
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//route to animals with parameters(param) - param routes must come AFTER the other get route
//this route is used to return a single animal
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    } else {
        //used to send the 404 request when no animal is found
        res.send(404);
    }
});

//route to accept data from users to be either used or stored on the server side
router.post('/animals', (req, res) => {
    //req.body is where our incoming content will be
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    //if any data req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)){
        res.status(400).send('The animal is not properly formatted.');
    } else {
    //add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
    // res.json(req.body);
    }
});

module.exports  = router;