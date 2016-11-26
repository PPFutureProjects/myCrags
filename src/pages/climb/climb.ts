import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapService} from '../../services/map.service';

import {Crag} from '../../shared/interfaces'

/*
  Generated class for the Climb page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-climb',
  templateUrl: 'climb.html'
})
export class ClimbPage {

  crags:Crag[]=[];

  constructor(public navCtrl: NavController, public mapService:MapService) {
    this.loadCrags();
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
