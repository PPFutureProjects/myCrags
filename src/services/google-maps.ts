import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity.service';
import { Geolocation } from 'ionic-native';

declare var google;


@Injectable()
export class GoogleMaps {

    mapElement: any;
    pleaseConnect: any;
    map: any;
    mapInitialized: boolean = false;
    mapLoaded: any;
    mapLoadedObserver: any;
    currentMarker: any;
    apiKey: string='AIzaSyCVg-aolI3jp62M-r_-O8C1D44zoQfnW6g';

    constructor(public connectivityService: ConnectivityService) {

    }

    init(mapElement: any, pleaseConnect: any): Promise<any> {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;

        return this.loadGoogleMaps();
    }

    loadGoogleMaps(): Promise<any> {
        return new Promise((resolve) => {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("load google maps script.");
                this.disableMap();

                if (this.connectivityService.isOnline()) {
                    window['mapInit'] = () => {
                        this.initMap().then(() => {
                            resolve(true);
                        });
                        this.enableMap();
                    }
                    let script = document.createElement("script");
                    script.id = "googleMaps";
                    if (this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';//'&language=el&region=GR';
                    } else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';//language=el&region=GR';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (this.connectivityService.isOnline()) {
                    this.initMap();
                    this.enableMap();
                } else {
                    this.disableMap();
                }
            }
            this.addConnectivityListeners();
        });
    }

    initMap(): Promise<any> {
        this.mapInitialized = true;
        return new Promise((resolve) => {
            Geolocation.getCurrentPosition().then((position) => {
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                let mapOptions = {
                    center: latLng,
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                this.map = new google.maps.Map(this.mapElement, mapOptions);
            });
        });
    }

    enableMap(): void {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    }

    disableMap() {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    }

    addConnectivityListeners(): void {
        document.addEventListener('online', () => {
            console.log('online');
            setTimeout(() => {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    this.loadGoogleMaps();
                } else {
                    if (!this.mapInitialized) {
                        this.initMap();
                    }
                    this.enableMap();
                }
            }, 2000);
        }, false);
        document.addEventListener('offline', () => {
            console.log('offline');
            this.disableMap();
        }, false)
    }
}