const UserModel = require("../models/user.model");
const db = require('./database.controller').db;

class AuthController {

    static create(name, email, password) {
        return new Promise((resolve, reject) => db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;', [name, email, password], (error, res) => {
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

    static getByEmail(email) {
        return new Promise((resolve, reject) => db.query('SELECT * FROM users WHERE email = $1;', [email], (error, res) => {
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

    static getByUserId(userId) {
        return new Promise((resolve, reject) => db.query('SELECT * FROM users WHERE id = $1;', [userId], (error, res) => {
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

module.exports = AuthController;