const Serializable = require('./serializable.model');


class WeatherModel extends Serializable {
    constructor() {
        super();
         this.city = '';
    }
}

module.exports = WeatherModel;