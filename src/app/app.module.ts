import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage, MapPage, CragsPage, AddCragPage, CragDetailsPage,
        TabsPage, ClimbPage, AboutPopoverPage, AddRoutePage, WeatherPage, WeatherSettingsPage } from '../pages/pages';

import { CragComponent } from '../shared/components/crag/crag-component';

import {MapService} from '../services/map.service';
import {MappingsService} from '../services/mappings.service';
import {WeatherService} from '../services/weather.service';

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
    AboutPopoverPage,
    AddRoutePage,
    CragComponent,
    WeatherPage,
    WeatherSettingsPage
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
    AboutPopoverPage,
    AddRoutePage,
    WeatherPage,
    WeatherSettingsPage 
  ],
  providers: [
    MapService,
    MappingsService,
    WeatherService
  ]
})
export class AppModule {}
