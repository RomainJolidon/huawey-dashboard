const Serializable = require('./serializable.model');

class UserPreferencesModel extends Serializable {
    constructor() {
        super();
        this.city = 'Paris';
    }
}

module.exports = UserPreferencesModel;