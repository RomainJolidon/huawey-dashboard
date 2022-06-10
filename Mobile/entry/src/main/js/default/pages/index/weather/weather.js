import fetch from '@system.fetch';
import storage from '@system.storage';

export default {
    data: {
        city: '',
        pageIndex: 1,
        WeatherCity: [],
        Cities: {"cities" : []},
    },

    onInit(){
        console.info(this.data.pageIndex);
        console.log(this.data.pageIndex);
        this.addCity();
    },

    showPanel(index) {
        this.clickedIdx = index;
        this.$element('simplepanel').show()
    },

    closePanel() {
        this.$element('simplepanel').close()
    },
    getCityName(e) {
        this.city = e.value;
    },
    pushCityToDB() {
        var that = this;
        this.Cities.cities.push(this.city.charAt(0).toUpperCase() + this.city.slice(1));

        storage.get({
            key: "userJWT",
            success: data => {
                if (data) {
                    fetch.fetch({
                        url: this.$r('strings.apiURL') + 'weather',
                        method:'POST',
                        header:{
                            'Authorization': `Bearer ${data}`,
                            'content-type':'application/json'
                        },
                        data: JSON.stringify(this.Cities),
                        responseType:'json',
                        success(response){
                            console.log(typeof response.data)
                            console.log('getListData fetch success:' + JSON.stringify(response))
                            console.log(response.data);
                            if (response.code == 200)
                            {
                                that.addCity();
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
                }
            }
        });
    },
    addCity() {
        var that = this;
        storage.get({
            key: "userJWT",
            success: data => {
                if (data) {
                    console.log("hello");
                    console.log(data);
                    fetch.fetch({
                        url: this.$r('strings.apiURL') + 'weather/?city='+this.city,
                        method:'GET',
                        header:{
                            'Authorization': `Bearer ${data}`,
                            'content-type':'application/json'
                        },
                        responseType:'json',
                        success(response){
                            console.log(typeof response.data)
                            console.log('getListData fetch success:' + JSON.stringify(response))
                            console.log(response.data);
                            if (response.code == 200)
                            {
                                var weather = JSON.parse(response.data);
                                that.WeatherCity = weather;
                                that.closePanel();
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
                }
            }
        });

    }

}
