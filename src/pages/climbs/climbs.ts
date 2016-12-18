import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Climbs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-climbs',
  templateUrl: 'climbs.html'
})
export class ClimbsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ClimbsPage Page');
  }

}
