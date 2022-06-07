import router from '@system.router';
import fetch from '@system.fetch';
export default {
    data: {
        loginName: "",
        loginPassword: "",

    },

    onHide() {
        this.closePanel();
    },

    launch() {

        const dataFromUser = {
            "name": this.loginName,
            "password": this.loginPassword
        };
        fetch.fetch({
            url:'https://d559-88-166-52-147.ngrok.io/user/login',
            data: dataFromUser,
            method:'POST',
            header:{
                'content-type':'application/json'
            },
            responseType:'json',
            success(response){
                console.log(typeof response.data)
                console.log('getListData fetch success:' + JSON.stringify(response))

            },
            fail(data,code){
                if (data.code == 200)
                {
                    console.log('create user');
                    console.log('getListData fetch success:' + JSON.stringify(code) + JSON.stringify(data))
                    /*router.push ({
                        uri: 'pages/index/default/default',
                        params: {
                            data:{pageIndex : 0}
                        }
                    });*/
                }
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
        console.log(this.data.value);
    },
    getLoginName(e) {
        this.loginName = e.value;
    },
    getLoginPassword(e) {
        this.loginPassword = e.value;
    },
}