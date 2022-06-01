import router from '@system.router';
export default {
    data: {
        title: 'World',
    },
    launch() {
        router.push ({
            uri: 'pages/index/default/default',
            params: {
                data:{pageIndex : 0}
            }
        });
        console.log("here");
    },
}
