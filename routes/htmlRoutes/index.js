const path = require('path');
const router = require('express').Router();

//route to get index.html served from the server
//NOte the '/' brings us to the root route of the server & is the route used to create a homepage for a server.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//route will take us to the animals page (note api is not included)
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

//route will take us to the zookeepers page (note api is not included)
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

//wildcard route to catch non-existent pages/routes
//NOTE: the wildcard route should ALWAYS come last
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;