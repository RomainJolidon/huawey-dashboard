import router from '@system.router';
import fetch from '@system.fetch';
import * as storage from './storage.js';

export default {
    onHide() {
        this.closePanel();
    },
    launch() {

        const dataFromUser = {
            "email": this.loginEmail,
            "password": this.loginPassword
        };
        router.push ({
            uri: 'pages/index/default/default',

        });
        fetch.fetch({
            url:'https://9d5f-88-166-52-147.ngrok.io/user/login',
            data: dataFromUser,
            method:'POST',
            header:{
                'content-type':'application/json'
            },
            responseType:'json',
            success(response){
                console.log(typeof response.data)
                console.log('getListData fetch success:' + JSON.stringify(response))
                console.log(response.data);
                if (response.code == 200)
                {
                    console.log('create user');
                    router.push ({
                        uri: 'pages/index/default/default',
                        params: {
                            userJWT: response.data
                        }
                    });
                    storage.default.setStorage("user", response.data);
                }
            },
            fail(data,code){
                console.log('getListData fetch fail:' + JSON.stringify(code) + JSON.stringify(data))
            },
            complete(...args){
                console.log('getListData fetch complete:' + JSON.stringify(args))
            }
        });
        console.log("here");
    },
    showPanel() {
        this.$element('simplepanel').show()
    },
    closePanel() {
        this.$element('simplepanel').close()
    },
    changeMode(e) {
        this.modeFlag = e.mode
    }
}