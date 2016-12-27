import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity.service';
import { Geolocation } from 'ionic-native';

declare var google;


@Injectable()
export class GoogleMaps {

    mapElement:any;
    pleaseConnect:any;
    map:any;
    mapInitialized:boolean=false;
    mapLoaded:any;
    mapLoadedObserver:any;
    currentMarker:any;
    apiKey:string;

    constructor(public connectivityService:ConnectivityService){
        
    }

}