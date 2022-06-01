const Serializable = require('./serializable.model');

class UserPreferencesModel extends Serializable {
    constructor() {
        super();
        this.theme = '';
    }
}

module.exports = UserPreferencesModel;