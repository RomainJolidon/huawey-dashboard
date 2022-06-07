import router from '@system.router';
import fetch from '@system.fetch';
export default {
    data: {
        loginEmail: "",
        loginPassword: "",

    },

    onHide() {
        this.closePanel();
    },

    launch() {

        const dataFromUser = {
            "email": this.loginEmail,
            "password": this.loginPassword
        };
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