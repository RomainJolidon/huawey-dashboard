// detail.js
import router from '@system.router';
import fetch from '@system.fetch';

export default {
    data: {
        pageIndex: 0,
    },
    launch() {
        router.back({uri:'pages/index'});
    },
    onInit(){
        const jwt = this.userJWT;

        console.info(this.pageIndex);
        console.log(this.pageIndex);
        console.log(jwt);
        fetch.fetch({
            url:'https://9d5f-88-166-52-147.ngrok.io/user/me',
            method:'GET',
            header:{
                'Authorization': `Bearer ${jwt}`,
                'content-type':'application/json'
            },
            responseType:'json',
            success(response){
                console.log(typeof response.data)
                console.log('getListData fetch success:' + JSON.stringify(response))

            },
            fail(data,code){

                console.log('getListData fetch fail:' + JSON.stringify(code) + JSON.stringify(data))
            },
            complete(...args){
                console.log('getListData fetch complete:' + JSON.stringify(args))
            }
        });
    }
}