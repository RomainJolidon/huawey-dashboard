const {db} = require("./database.controller");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

class NewsController {
    static getByKeyword(keyword, country) {
        return newsapi.v2.topHeadlines({
            q: keyword,
            language: 'en',
            country: country,
            page: 1
        })
    }
}
module.exports = NewsController;