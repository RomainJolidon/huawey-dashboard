const express = require('express');
const WeatherController = require("../controllers/weather.controller");
const router = express.Router();
const jwt = require('jsonwebtoken');
const {UserExists} = require("./utils");

// router.use('/weather', function(req, res, next) {
//     const bearerToken = req.headers.authorization;
//     const token = !!bearerToken ? bearerToken.split(' ')[1] : null;
  
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     const userId = decoded.id;
  
//     AuthController.getByUserId(userId).then(user => {
//       req.context.set('user', user)
//       next();
//     }).catch(err => res.status(404).send(err));
//   });

router.use('/', UserExists);
router.get('/', function(req, res, next) {
    const user = req.context.get('user');
    WeatherController.getWeather(user.id).then((weatherData) => {
        res.status(200).json(weatherData);
    }).catch(err => res.status(500).json({message: err}));
  });

router.post('/', function(req, res, next){
    const {cities} = req.body;
    const user = req.context.get('user');
    WeatherController.setCities(cities, user.id).then(() => {
        res.status(200).send("Successfully changed city name");
    }).catch(err => res.status(500).send(err));
});

module.exports = router;