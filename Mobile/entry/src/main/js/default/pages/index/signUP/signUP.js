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
            url:'https://d559-88-166-52-147.ngrok.io/user/register',
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
                if (data.code == 201)
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
