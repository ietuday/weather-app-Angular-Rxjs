import { Injectable } from '@angular/core';
import { WEATHER_ITEMS } from './weather.data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import { WeatherItem } from './weather-item';

@Injectable()
export class WeatherService{

    constructor(private _http:Http){

    }

    getWeatherItems(){
        return WEATHER_ITEMS;
    }

    addWeatherItem(weatherItem:WeatherItem){
        WEATHER_ITEMS.push(weatherItem);
    }

    clearWeatherItems() {
        WEATHER_ITEMS.splice(0);
    }

    searchWeatherData(cityName: string): Observable<any> { 
        return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=4b2967480a3acac2bf0a7f540d6fbb6c&units=metric')
            .map(response => response.json())
            .catch(error => {
                // debugger;
                return Observable.throw(error.json().message)
            });
    }
    
}