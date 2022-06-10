// detail.js
import router from '@system.router';
import fetch from '@system.fetch';
import storage from '@system.storage';

//import * as storage from '../storage.js';

export default {
    data: {
        pageIndex: 0,
        name: "",
        email: ""
    },
    launch() {
        router.back({uri:'pages/index'});
    },
    onInit(){
        var that = this;
        storage.get({
            key: "userJWT",
            success: data => {
                if (data) {
                    fetch.fetch({
                        url: this.$r('strings.apiURL') + 'user/me',
                        method:'GET',
                        header:{
                            'Authorization': `Bearer ${data}`,
                            'content-type':'application/json'
                        },
                        responseType:'json',
                        success(response){
                            console.log(typeof response.data)
                            console.log('getListData fetch success:' + JSON.stringify(response))
                            var result = JSON.parse(response.data);
                            that.name = result.name;
                            that.email = result.email;

                        },
                        fail(data,code){
                            console.log("JWT expired log out")
                            console.log('getListData fetch fail:' + JSON.stringify(code) + JSON.stringify(data))
                        },
                        complete(...args){
                            console.log('getListData fetch complete:' + JSON.stringify(args))
                        }
                    });
                }
            }
        })

    }
}