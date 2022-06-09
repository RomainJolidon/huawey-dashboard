import router from '@system.router';
import fetch from '@system.fetch';
import storage from '@system.storage';
//import * as storage from './storage.js';

export default {
    data: {
        loginEmail: "",
        loginPassword: "",
        ErrorMsg: ""
    },

    onHide() {
        this.closePanel();
    },

    launch() {
        let dataFromUser = {
            "email": this.loginEmail,
            "password": this.loginPassword
        };

        console.log(this.$r('strings.apiURL'));
        fetch.fetch({
            url: this.$r('strings.apiURL') + 'user/login',
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
                    storage.set({
                        key: "userJWT",
                        value: response.data
                    });
                    router.push ({
                        uri: 'pages/index/default/default',
                        params: {
                            userJWT: response.data
                        }
                    });
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
    },

    showPanel() {
        this.$element('simplepanel').show()
    },

    closePanel() {
        this.$element('simplepanel').close()
    },
    getLoginEmail(e) {
        this.loginEmail = e.value;
    },
    getLoginPassword(e) {
        this.loginPassword = e.value;
    },
}