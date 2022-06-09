import router from '@system.router';
import fetch from '@system.fetch';

export default {
    data: {
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
            url:'https://9d5f-88-166-52-147.ngrok.io/user/register',
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
                    router.push ({
                        uri: 'pages/index/default/default',
                        params: {
                            userJWT: response.data
                        }
                    });
                }
            },
            fail(data,code){
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
