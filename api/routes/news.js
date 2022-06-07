const express = require('express');
const {UserExists} = require("./utils");
const router = express.Router();
const newsController = require('../controllers/news.controller');

/* GET my user */
router.use('/', UserExists);
router.get('/', function(req, res, next) {
    const keyword = req.query.keyword;
    const country = req.query.country;
    newsController.getByKeyword(keyword, country).then((data) => {
        if (data.status !== "ok") {
            res.status(500).json({message: "failed to get news from country"})
            return;
        }
        res.status(200).json(data);
    })
});

module.exports = router;