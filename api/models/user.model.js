const Serializable = require('./serializable.model');


class UserModel extends Serializable {
    constructor() {
        super();
         this.id = '';
         this. name = '';
         this.email = '';
    }
}

module.exports = UserModel;