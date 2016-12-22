import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {
  HomePage, AddClimbPage, AddCragPage, CragsListPage,
  AddRoutePage, MapPage, CragsPage, ClimbsPage //TabsPage
} from '../pages/pages';
import { IPage } from '../shared/interfaces';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;

  appPages: IPage[] = [
    { title:'Αρχική', component: HomePage, index: 4, icon:'home'},
    { title: 'Ημερολόγιο', component: ClimbsPage, index: 3, icon: 'bookmarks' },
    { title: 'Κοντά μου', component: CragsListPage, index: 1, icon: 'list' },
    //{ title: 'Forum', component: TabsPage, index: 2, icon: 'chatboxes' }
  ];

  menuPages: IPage[] = [
    { title: 'Χάρτης', component: MapPage, icon: 'globe' },
    { title: 'Πεδία', component: CragsPage, index: 2, icon: 'podium' }
  ];

  adminPages: IPage[] = [
    { title: 'Αναρριχητική Ημέρα', component: AddClimbPage, icon: 'ios-add-circle-outline' },
    { title: 'Πεδίο', component: AddCragPage, icon: 'ios-add-circle-outline' },
    { title: 'Διαδρομή', component: AddRoutePage, icon: 'ios-add-circle-outline' }
  ];

  constructor(platform: Platform, public menuController: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.menuController.enable(true);
    });
  }
  openPage(page: IPage) {
    
    if (page.index) {
      this.nav.setRoot(page.component);

    } else {
      //*********In case of tabs use *********/
      this.nav.push(page.component);
      //this.nav.setRoot(page.component);
    }
  }
}
