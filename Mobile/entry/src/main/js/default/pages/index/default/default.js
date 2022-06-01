// detail.js
import router from '@system.router';
export default {
    data: {
        pageIndex: 0
    },
    launch() {
        router.back({uri:'pages/index'});
    },
    onInit(){
        console.info(this.pageIndex);
        console.log(this.pageIndex);
    }
}