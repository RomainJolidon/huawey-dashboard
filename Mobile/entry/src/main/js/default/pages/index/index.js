import router from '@system.router';
export default {
    onHide() {
        this.closePanel();
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