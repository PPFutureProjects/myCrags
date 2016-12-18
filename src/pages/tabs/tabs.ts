import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { CragsPage, CragsListPage } from '../pages';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  climbsRoot: any = MapPage;
  cragsListRoot: any = CragsListPage;
  //forumRoot: any = AddClimbPage;
 mySelectedIndex: number;

  constructor(public navController:NavController, navParams:NavParams) {
    this.mySelectedIndex=navParams.data.tabIndex ||0;
  }
  lets($event){
    console.log('Hello tabs Page');
  }
}
