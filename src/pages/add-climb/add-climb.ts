import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapService} from '../../services/map.service';

import {ICrag} from '../../shared/interfaces'

/*
  Generated class for the Climb page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-climb',
  templateUrl: 'add-climb.html'
})
export class AddClimbPage {

  crags:ICrag[]=[];

  constructor(public navCtrl: NavController, public mapService:MapService) {
    this.loadCrags();
    console.log('Hello Climb Page');
  }

  ionViewDidLoad() {
    this.loadCrags();
    console.log('Hello Climb Page');
  }

  saveClimb():void {

  }

  loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
        })
    }
}
