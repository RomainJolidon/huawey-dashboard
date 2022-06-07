const db = require('./database.controller').db;

class WeatherController {

    static setCity(cityName) {
        return new Promise((resolve, reject) => db.query('INSERT INTO weather_preferences (city) VALUES ($1);', [cityName], (error, res) => {
            if (error) {
                reject(error);
                return
            } else if (!cityName) {
                reject(new Error("City can't be empty"));
                return
            }
            resolve();
        }));
    }
}

module.exports = WeatherController;