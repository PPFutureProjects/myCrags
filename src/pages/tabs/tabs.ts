import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { ClimbPage } from '../climb/climb';
import { CragsPage } from '../crags/crags';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  mapRoot: any = MapPage;
  cragsRoot: any = CragsPage;
  addClimbRoot: any = ClimbPage;

  constructor(public navController:NavController) {

  }
}
