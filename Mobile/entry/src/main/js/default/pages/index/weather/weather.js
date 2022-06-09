import fetch from '@system.fetch';
import storage from '@system.storage';

export default {
    data: {
        city: '',
        pageIndex: 1,
        WeatherCity:
        [
            {
                "City": "London",
                "Temp": 22.64,
                "Icon": "http://openweathermap.org/img/w/"+"01d"+".png",
                "Description": "Clear",
                "Max_temp": 26.77,
                "Min_temp": 18.17,
                "Feel_temp": 21.06,
                "SunRise": new Date(1654746469).getHours(),
                "SunSet": new Date(1654804324).getHours(),
            }
        ],
        weather: {
            "coord": {
                "lon": 2.3488,
                "lat": 48.8534
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 21.64,
                "feels_like": 21.06,
                "temp_min": 21.17,
                "temp_max": 22.77,
                "pressure": 1020,
                "humidity": 46
            },
            "visibility": 10000,
            "wind": {
                "speed": 5.14,
                "deg": 300
            },
            "clouds": {
                "all": 0
            },
            "dt": 1654789303,
            "sys": {
                "type": 2,
                "id": 2041230,
                "country": "FR",
                "sunrise": 1654746469,
                "sunset": 1654804324
            },
            "timezone": 7200,
            "id": 2988507,
            "name": "Paris",
            "cod": 200
        }
    },

    onInit(){
        console.info(this.data.pageIndex);
        console.log(this.data.pageIndex);
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
    addCity() {
        var that = this;
        //todo test the api call
        /*storage.get({
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
                                var toAdd = {
                                    "City": weather.name,
                                    "Temp": weather.main.temp,
                                    "Icon": "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png",
                                    "Description": weather.weather[0].main,
                                    "Max_temp": weather.main.temp_max,
                                    "Min_temp": weather.main.temp_min,
                                    "Feel_temp": weather.main.feels_like,
                                    "SunRise": new Date(weather.sys.sunrise).getHours(),
                                    "SunSet": new Date(weather.sys.sunset).getHours(),
                                }
                                that.WeatherCity.push(toAdd);
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
        });*/
        var toAdd = {
            "City": that.weather.name,
            "Temp": that.weather.main.temp,
            "Icon": "http://openweathermap.org/img/w/"+that.weather.weather[0].icon+".png",
            "Description": that.weather.weather[0].main,
            "Max_temp": that.weather.main.temp_max,
            "Min_temp": that.weather.main.temp_min,
            "Feel_temp": that.weather.main.feels_like,
            "SunRise": new Date(that.weather.sys.sunrise).getHours(),
            "SunSet": new Date(that.weather.sys.sunset).getHours(),
        }
        that.WeatherCity.push(toAdd);
        this.closePanel();
    }

}
