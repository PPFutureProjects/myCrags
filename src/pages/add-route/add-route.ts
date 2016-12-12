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
  routes: Route[] = [];
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
  }

  ionViewDidLoad() {
    this.crag = this.navParams.get('crag');
  }

  addRoute() {
    var result;
    this.routes = this.crag.routes;
    var newRoute: Route = {
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
          name: this.name,
          cragId: this.crag._id,
          orderNo: '',
          routeNo: this.routeNo,
          grade: this.grade,
          heigth: this.heigth,
          climbType: this.climbType,
          qDraws: this.qDraws
        }
        that.crag.routes.push(newRoute);
        this.name = '';
        this.orderNo = '';
        this.routeNo = '';
        this.grade = '';
        this.heigth = '';
        this.climbType = '';
        this.qDraws = null;

        this.navCtrl.pop();
        console.log(newRoute);
      },
      err => console.log(err),
      () => console.log('OK'))
  }
}
