export default {
    data: {
        title: 'World',
        pageIndex: 1,
        fakeData : [
        {"text":"Profile","img":'./common/images/user.png', "route": 'pages/index/default/default'},
        {"text":"Weather","img":"./common/images/cloudy.png", "route": 'pages/index/weather/weather'},
        {"text":"News","img":"./common/images/news-report.png", "route": 'pages/index/news/news'},
        ]
    },
    onInit(){
        console.info(this.data.pageIndex);
        console.log(this.data.pageIndex);
    }
}
