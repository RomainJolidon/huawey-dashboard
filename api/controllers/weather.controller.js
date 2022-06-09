const db = require('./database.controller').db;
const weather = require('openweather-apis');

console.log(process.env.WEATHER_API_KEY)
weather.setAPPID(process.env.WEATHER_API_KEY);
weather.setLang('en')

class WeatherController {
    static getWeather(userId) {
        return new Promise((resolve, reject) => db.query('SELECT city from user_preferences WHERE user_id = $1;', [userId], (error, res) => {
            if (error) {
                reject(error);
                return
            } else if (res.rows.length !== 1) {
                reject(new Error("User Preferences not found"));
                return
            }
            const city = res.rows[0].city;
            weather.setCity(city);
            weather.getAllWeather(function(err, JSONObj){
                if (err) {
                    reject(err);
                }
                resolve(JSONObj);
            });
        }));
    }

    static setCity(cityName) {
        return new Promise((resolve, reject) => db.query('INSERT INTO user_preferences (city) VALUES ($1);', [cityName], (error, res) => {
            if (error) {
                reject(error);
                return
            }
            resolve();
        }));
    }
}

module.exports = WeatherController;