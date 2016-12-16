import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class WeatherService {

    data: any;

    apiKey = '86c47cceffd3c332';
    conditionsWeatherUrl = 'http://api.wunderground.com/api/' + this.apiKey + '/conditions/q';
    geoLookupWeatherUrl = 'http://api.wunderground.com/api/' + this.apiKey + '/geolookup/q';
    searchUrl = "http://localhost:8100/search/aq?query=";

    constructor(public http: Http) { }

    getWeatherByCondition(city, country) {
        return this.http.get(this.conditionsWeatherUrl + '/' + country + '/' + city + '.json')
            .map(res => res.json());
    }

    getWeatherByGeoLookup(lat, lng) {
        return this.http.get(this.geoLookupWeatherUrl + '/' + lat + ',' + lng + '.json')
            .map(res => res.json());
    }

    getWeatherByZmw(zmw) {
        return this.http.get(this.conditionsWeatherUrl + '/zmw:' + zmw + '.json')
            .map(res => res.json());
    }
    searchCities(searchStr) {
        return this.http.get("http://autocomplete.wunderground.com/aq?query=" + searchStr)
            .map(res => res.json());
    }
}