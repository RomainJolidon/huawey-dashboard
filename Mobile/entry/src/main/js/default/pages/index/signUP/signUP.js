import router from '@system.router';
import fetch from '@system.fetch';
import * as storage from '../storage.js';

export default {
    data: {
        ErrorMsg: "",
        RegisterName: "",
        RegisterPassword: "",
        RegisterEmail: "",
    },

    register() {
        const dataFromUser = {
            "name": this.RegisterName,
            "email": this.RegisterEmail,
            "password": this.RegisterPassword
        };

        fetch.fetch({
            url: this.$r('strings.apiURL') + 'user/register',
            data: dataFromUser,
            method:'POST',
            header:{
                'content-type':'application/json'
            },
            success(response){
                console.log(typeof response.data)
                console.log('getListData fetch success:' + JSON.stringify(response))
                if (response.code == 200)
                {
                    console.log('create user');
                    storage.default.setStorage("user", response.data);
                    router.push ({
                        uri: 'pages/index/default/default',
                        params: {
                            userJWT: response.data
                        }
                    });
                }
            },
            fail(data,code){
                this.ErrorMsg = "Error try again";
                console.log('getListData fetch fail:' + JSON.stringify(code) + JSON.stringify(data))
            },
            complete(...args){
                console.log('getListData fetch complete:' + JSON.stringify(args))
            }
        });
    },

    getRegisterName(e) {
        this.RegisterName = e.value;
        console.info(this.RegisterName);
    },
    getRegisterPassword(e) {
        this.RegisterPassword = e.value;
    },
    getRegisterEmail(e) {
        this.RegisterEmail = e.value;
    },
}
