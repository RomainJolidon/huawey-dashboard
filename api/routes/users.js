const express = require('express');
const AuthController = require("../controllers/auth.controller");
const UserController = require("../controllers/user.controller");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserExists} = require("./utils");

function createSession(user) {
  return jwt.sign({
    id: user.id
  }, process.env.JWT_KEY);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user login */

router.post('/login', function(req, res, next) {
  const {email, password} = req.body;
  AuthController.getByEmail(email).then(user => {
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(404).json({message: 'Failed to login'});
      return
    }
    res.status(200).send(createSession(user));
  }).catch(err => res.status(404).send(err));
});

/* POST user register */
router.post('/register', function(req, res, next) {
  const {name, email, password} = req.body;

  const hash = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_KEY));
  AuthController.create(name, email, hash).then(user => {
    UserController.createPreferences(user.id).then(() => {
      res.status(200).send(createSession(user));
    }).catch(err => res.status(500).send(err));
  }).catch(err => res.status(500).send(err));
});

/* GET my user */
router.use('/me', UserExists);
router.get('/me', function(req, res, next) {
  const user = req.context.get('user')

  UserController.getPreferencesById(user.id).then(data => {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      settings: data
    });
  }).catch(err => res.status(500).send(err));
});

module.exports = router;
