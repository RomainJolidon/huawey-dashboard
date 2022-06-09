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
                    "id": null,
                    "name": "The Guardian"
                },
                "author": "Larry Elliott",
                "title": "Return to the 70s: World Bank warns of weak growth and high inflation - The Guardian",
                "description": "Stagflation feared as global economy suffers fallout from Covid pandemic and Russian invasion of Ukraine",
                "url": "https://amp.theguardian.com/business/2022/jun/07/world-bank-economy-weak-growth-inflation-ukraine-covid",
                "urlToImage": null,
                "publishedAt": "2022-06-07T15:03:00Z",
                "content": "Global economyStagflation feared as global economy suffers fallout from Covid pandemic, Chinese lockdowns and war in Ukraine \r\nThe global economy faces a protracted period of weak growth and high inf… [+3593 chars]"
            },
            {
                "source": {
                    "id": null,
                    "name": "CNBC"
                },
                "author": "Natasha Turak",
                "title": "Ukraine retakes parts of Severodonetsk amid brutal street fighting; World Bank slashes global growth forecast - CNBC",
                "description": "Brutal street fighting continues in Ukraine's east, particularly in the cities of Sievierodonetsk and Lysychansk.",
                "url": "https://www.cnbc.com/2022/06/07/russia-ukraine-live-updates.html",
                "urlToImage": "https://image.cnbcfm.com/api/v1/image/107064563-1653063673849-gettyimages-1240788796-AFP_32AL4R8.jpeg?v=1653063794&w=1920&h=1080",
                "publishedAt": "2022-06-07T14:07:00Z",
                "content": "Ukraine cannot be pressured by other countries into accepting a bad peace deal with Russia, U.K. Prime Minister Boris Johnson said during a meeting with his cabinet.\r\nJohnson \"said it was vital that … [+919 chars]"
            },
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
        console.info(this.pageIndex);
        console.log(this.pageIndex);
    },

    getSearchInput(e) {
        this.search = e.value;
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
