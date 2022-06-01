import router from '@system.router';
export default {
    props: ['compProp'],
    data: {
        menus:[
        {"text":"Profile","img":'./common/images/user.png', "route": 'pages/index/default/default'},
        {"text":"Weather","img":"./common/images/cloudy.png", "route": 'pages/index/weather/weather'},
        {"text":"News","img":"./common/images/news-report.png", "route": 'pages/index/news/news'},
        ],
        Pindex:0
    },
    changecontent(index){
        this.Pindex=index;

        router.replace ({
            uri: this.menus[index].route,
            params: {
                data:{pageIndex : index}
            }
        });
        //console.log(this.menus[index].text);
        //console.log(this.menus[index].img1);
    },
    onInit() {

        this.Pindex=this.compProp;
        //document.getElementById("p1")
    }
}