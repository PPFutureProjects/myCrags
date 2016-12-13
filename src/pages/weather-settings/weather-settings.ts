import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the WeatherSettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-weather-settings',
  templateUrl: 'weather-settings.html'
})
export class WeatherSettingsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello WeatherSettingsPage Page');
  }

}
