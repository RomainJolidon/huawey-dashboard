//import * as storage from '../storage.js';
import fetch from '@system.fetch';
import storage from '@system.storage';

export default {
    data: {
        clickedIdx : 0,
        search: '',
        pageIndex: 2,
        articles: [
            {
                "source": {
                    "id": "the-wall-street-journal",
                    "name": "The Wall Street Journal"
                },
                "author": "Daniel Michaels",
                "title": "In Russia’s Battle for East Ukraine, Both Sides Have Higher Stakes at Play - The Wall Street Journal",
                "description": "Moscow aims to prove it can gain and retain territory, while Ukraine wants to show some wary Western allies that it has a chance of prevailing against bigger Russian forces.",
                "url": "https://www.wsj.com/articles/in-russias-battle-for-east-ukraine-both-sides-have-higher-stakes-at-play-11654606965",
                "urlToImage": "https://images.wsj.net/im-558337/social",
                "publishedAt": "2022-06-07T13:52:00Z",
                "content": "Russias strategy for seizing territory in Ukraines Donbas region carries implications far beyond the battlefield.\r\nOver the past month, Moscows troops have pushed to expand and consolidate areas they… [+364 chars]"
            },
        ]
    },

    onInit(){
        this.getArticle();
    },

    getSearchInput(e) {
        this.search = e.value;
        var that = this;
        this.getArticle();
    },

    getArticle() {
        var that = this;
        storage.get({
            key: "userJWT",
            success: data => {
                if (data) {
                    console.log("hello");
                    console.log(data);
                    fetch.fetch({
                        url: this.$r('strings.apiURL') + 'news/?keyword='+this.search,
                        method:'GET',
                        header:{
                            'Authorization': `Bearer ${data}`,
                            'content-type':'application/json'
                        },
                        responseType:'json',
                        success(response){
                            console.log(typeof response.data)
                            console.log('getListData fetch success:' + JSON.stringify(response))
                            console.log(response.data);
                            if (response.code == 200)
                            {
                                that.articles = JSON.parse(response.data);
                                console.log(that.articles);
                                //that.$set("articles", JSON.parse(response.data));
                            }
                        },
                        fail(data,code){
                            this.ErrorMsg = "your email or password is incorrect";
                            console.log('getListData fetch fail:' + JSON.stringify(code) + JSON.stringify(data))
                        },
                        complete(...args){
                            console.log('getListData fetch complete:' + JSON.stringify(args))
                        }
                    });
                }
            }
        });
    },

    showPanel(index) {
        this.clickedIdx = index;
        this.$element('simplepanel').show()
    },

    closePanel() {
        this.$element('simplepanel').close()
    },
}
