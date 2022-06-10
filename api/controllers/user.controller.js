const UserModel = require("../models/user.model");
const db = require('./database.controller').db;

class UserController {

    static createPreferences(userId, theme) {
        return new Promise((resolve, reject) => db.query('INSERT INTO user_preferences (user_id) VALUES ($1) RETURNING *;', [userId], (error, res) => {
            if (error) {
                reject(error);
                return
            }
            resolve();
        }));
    }

    static getPreferencesById(userId) {
        return new Promise((resolve, reject) => db.query('SELECT * FROM user_preferences WHERE user_id = $1;', [userId], (error, res) => {
            if (error) {
                reject(error);
                return
            } else if (!res || res.rows.length !== 1) {
                reject(new Error('User not found'));
                return
            }
            resolve(new UserModel().fromJson(res.rows[0]));
        }));
    }
}

module.exports = UserController;