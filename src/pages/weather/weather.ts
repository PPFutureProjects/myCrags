import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { WeatherSettingsPage } from '../pages';
import { WeatherService } from '../../services/weather.service';

import { Crag } from '../../shared/interfaces';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage implements OnInit {

  city;
  country;
  lat;
  lng;
  zmw;
  weather;
  queryText;
  results;
  crag: Crag;
  loadedData: boolean = false;

  constructor(public navCtrl: NavController,
    public loadingController: LoadingController,
    public navParams: NavParams,
    public weatherService: WeatherService) {

    this.crag = this.navParams.get('crag');
    this.lat = this.crag.lat;
    this.lng = this.crag.lng;
    console.log('from constructor');
    this.getGeoLookupWeather();
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    console.log('from ngOnInit');
    this.getGeoLookupWeather();
  }

  getQuery() {
    this.weatherService.searchCities(this.queryText)
      .subscribe(res => {
        this.results = res.RESULTS
        console.log(this.results);
      });
  }

  //get location name and country via coordinates
  getGeoLookupWeather() {
    this.weatherService.getWeatherByGeoLookup(this.lat, this.lng)
      .subscribe(result => {

        console.log('result', result);
        this.zmw = (result.location.l).substring(7);
        this.weatherService.getWeatherByZmw(this.zmw)
          .subscribe(weather => {
            console.log('zmw', (result.location.l).substring(7));
            console.log('weather', weather);
            console.log('zmw', result.location.zmw);
            this.weather = weather.current_observation;
            this.loadedData = true;
          });
      });
  }

  chooseCity(city) {
    this.results = [];
    this.weatherService.getWeatherByZmw(city.zmw)
      .subscribe(weather => {
        console.log('weather', weather);

        this.weather = weather.current_observation;
      })

  }

  goToSettings() {
    this.navCtrl.push(WeatherSettingsPage);
  }
}
