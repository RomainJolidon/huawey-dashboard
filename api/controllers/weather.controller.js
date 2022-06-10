const db = require('./database.controller').db;
const weather = require('openweather-apis');
const cityIds = require('../resources/city.list.min.json');

weather.setAPPID(process.env.WEATHER_API_KEY);
weather.setLang('en')

class WeatherController {
    static getWeather(userId) {
        return new Promise((resolve, reject) => db.query('SELECT cities from user_preferences WHERE user_id = $1;', [userId], (error, res) => {
            if (error) {
                reject(error);
                return
            } else if (res.rows.length !== 1) {
                reject(new Error("User Preferences not found"));
                return
            }
            const weatherDatas = [];
            const cities = res.rows[0].cities;
            const f = cities.map(city => {
                const foundCity = cityIds.find(jsonCity => jsonCity.name === city);
                if (!!foundCity) {
                    return foundCity.id;
                }
            }).filter(city => !!city);
            console.log(f);
            f.forEach(cityId => {
                weatherDatas.push(new Promise((weatherResolve, weatherReject) => {
                    weather.setCityId(cityId);
                    weather.getAllWeather(function(err, JSONObj){
                        if (err) {
                            weatherReject(err);
                        }
                        weatherResolve(JSONObj);
                    });
                }))
            })

            Promise.all(weatherDatas).then((awaitedData) => {
                resolve(awaitedData.map(data => ({
                    city: data.name,
                    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                    description: data.weather[0].description,
                    temp: data.main.temp,
                    max_temp: data.main.temp_max,
                    min_temp: data.main.temp_min,
                    feel_like: data.main.feels_like,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                })))
            }).catch(err => reject(err))
            //const t = cityIds.filter((jsonCity) => cities.includes(jsonCity.name)).map(city => city.id);
        }));
    }

    static setCities(cityNames, userId) {
        return new Promise((resolve, reject) => db.query('UPDATE user_preferences SET cities = $1 WHERE user_id = $2', [cityNames, userId], (error, res) => {
            if (error) {
                reject(error);
                return
            }
            resolve();
        }));
    }
}

module.exports = WeatherController;