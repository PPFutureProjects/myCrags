import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage, MapPage, CragsPage, AddCragPage, CragDetailsPage,TabsPage, ClimbPage, AboutPopoverPage } from '../pages/pages';


import {MapService} from '../services/map.service';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    MapPage,
    CragsPage,
    AddCragPage,
    CragDetailsPage,
    TabsPage,
    ClimbPage,
    AboutPopoverPage    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    CragsPage,
    AddCragPage,
    CragDetailsPage,
    TabsPage,
    ClimbPage,
    AboutPopoverPage 
  ],
  providers: [
    MapService
  ]
})
export class AppModule {}
