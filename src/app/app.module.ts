import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage, MapPage, CragsPage, AddCragPage, CragDetailsPage, CragsListPage, RoutesListPage, ClimbsPage, FilterPage,
        TabsPage, AddClimbPage, AboutPopoverPage, AddRoutePage, WeatherPage, WeatherSettingsPage } from '../pages/pages';

import { CragComponent } from '../shared/components/crag/crag-component';

import {MapService} from '../services/map.service';
import {MappingsService} from '../services/mappings.service';
import {WeatherService} from '../services/weather.service';
import {ConnectivityService} from '../services/connectivity.service';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { AgmCoreModule} from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    MapPage,
    CragsPage,
    AddCragPage,
    CragDetailsPage,
    CragsListPage,
    ClimbsPage,
    RoutesListPage,
    TabsPage,
    AddClimbPage,
    AboutPopoverPage,
    AddRoutePage,
    CragComponent,
    FilterPage,
    WeatherPage,
    WeatherSettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM', libraries: ["places"]})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    CragsPage,
    AddCragPage,
    CragDetailsPage,
    CragsListPage,
    RoutesListPage,
    ClimbsPage,
    TabsPage,
    AddClimbPage,
    AboutPopoverPage,
    AddRoutePage,
    FilterPage,
    WeatherPage,
    WeatherSettingsPage 
  ],
  providers: [
    MapService,
    MappingsService,
    WeatherService,
    ConnectivityService,
    GoogleMapsAPIWrapper
  ]
})
export class AppModule {}
