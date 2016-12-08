import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CragsPage } from '../crags/crags';

import { MapService } from '../../services/map.service';
import { Crag, Route } from '../../shared/interfaces';

@Component({
  selector: 'page-add-route',
  templateUrl: 'add-route.html'
})
export class AddRoutePage {

  crag: Crag;
  route: Route;
  routes:Route[]=[];
  name: string;
  orderNo: string;
  routeNo: string;
  grade: string;
  heigth: string;
  climbType: string;
  qDraws: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public mapService: MapService) {
    this.crag = this.navParams.get('crag');
    console.log('id'+ this.crag._id)
  }

  ionViewDidLoad() {
    this.crag = this.navParams.get('crag');
  }

  addRoute() {
    var result;
    this.routes=this.crag.routes;
    console.log('this routes '+this.crag.routes);
    var newRoute :Route= {
      //_id:'',
      name: this.name,
      cragId: this.crag._id,
      orderNo: '',
      routeNo: this.routeNo,
      grade: this.grade,
      heigth: this.heigth,
      climbType: this.climbType,
      qDraws: this.qDraws,
    };
    var that = this;
    result = this.mapService.addRoute(newRoute)
      .subscribe(data => {
        newRoute = {
          //_id:data._id,
          name: this.name,
          cragId: this.crag._id,
          orderNo: '',
          routeNo: this.routeNo,
          grade: this.grade,
          heigth: this.heigth,
          climbType: this.climbType,
          qDraws: this.qDraws
        }
        console.log('before push '+newRoute);
        console.log('that routes '+that.crag.routes);
        console.log('this routes '+this.crag.routes);
        that.crag.routes.push(newRoute);
      });
      // .subscribe(()=>{
        
      // })
        
        console.log('after push '+newRoute);
        this.name = '';
        this.orderNo = '';
        this.routeNo = '';
        this.grade = '';
        this.heigth = '';
        this.climbType = '';
        this.qDraws = null;
        
        this.navCtrl.setRoot(CragsPage);
        console.log(newRoute);
       }//,
  //     err => console.log(err),
  //     //add toast notification
  //     () => console.log('OK'));
  // }
}
