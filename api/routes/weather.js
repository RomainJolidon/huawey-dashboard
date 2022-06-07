const express = require('express');
const WeatherController = require("../controllers/weather.controller");
const router = express.Router();
const jwt = require('jsonwebtoken');

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

router.post('/setSity', function(req, res, next){
    const cityName = req.body;
    WeatherController.setCity(cityName).then(() => {
        res.status(200).send("Successfully changed city name");
    }).catch(err => res.status(500).send(err));
});

module.exports = router;