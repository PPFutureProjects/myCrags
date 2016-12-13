import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WeatherSettingsPage } from '../pages';
import { WeatherService } from '../../services/weather.service';
/*
  Generated class for the Weather page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage implements OnInit {

  city;
  country;
  weather;
  queryText;
  results;

  constructor(public navCtrl: NavController, public weatherService:WeatherService) {
    this.city='Athens';
    this.country='GR';
  }

  ionViewDidLoad() {
    console.log('Hello WeatherPage Page');

  }

  ngOnInit(){
    this.weatherService.getWeatherByCondition(this.city, this.country)
      .subscribe(weather=>{
        console.log(weather);
        this.weather=weather.current_observation;
      })
  }

  getQuery(){
    this.weatherService.searchCities(this.queryText)
      .subscribe(res=>{
        this.results=res.RESULTS
        console.log(this.results);
      });
  }

  goToSettings(){
    this.navCtrl.push(WeatherSettingsPage);
  }

}
