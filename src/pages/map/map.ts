import { Component, OnInit, NgZone } from '@angular/core';
import {
    NavController, NavParams, PopoverController,
    AlertController, ModalController, Platform
} from 'ionic-angular';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Geolocation } from 'ionic-native';

import { CragDetailsPage, CragsListPage, AboutPopoverPage, WeatherPage, FilterPage } from '../../pages/pages';
import { MapService } from '../../services/map.service';
import { ConnectivityService } from '../../services/connectivity.service';
import { ICrag } from '../../shared/interfaces'

declare var window: any;
declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage implements OnInit {

    map = {
        //Zoom Level
        zoom: 8,
        //Start position
        lat: 38.1307068,
        lng: 23.7213821
    }
    //properties
    rootPage: boolean = true;
    currentPosition: ICrag
    totalCrags;
    crag: ICrag;
    crags: ICrag[];
    excludeCrags = [];
    firstTime: boolean = true;
    isDisplayOfflineMode: boolean = false;
    isClicked: boolean;
    opened: boolean = false;

    constructor(public navController: NavController, public navParams: NavParams, public modalController: ModalController,
        public popoverController: PopoverController, public connectivityService: ConnectivityService,
        public zone: NgZone, public alertController: AlertController, public mapsAPILoader: MapsAPILoader,
        public mapService: MapService, public platform: Platform) {

        console.log('Constructing crags.....');

        this.crag = this.navParams.get('crag');
        //request from crags page or crag-details page to 
        //focus on specific crag
        if (this.crag) {
            this.showCrag();
            this.rootPage = this.navParams.get('rootPage');
        } else {
            //map page
            this.loadMap();
            this.autocomplete();
            this.initializeCurrenPosition();
            this.loadCrags();
        }
        console.log('cragInfo ', this.crag)
    }

    ngOnInit() {
        //this.initializeCurrenPosition();
        this.loadCrags();
        //this.autocomplete();
    }

    //filter Map page
    presentFilter() {
        let modal = this.modalController.create(FilterPage, this.excludeCrags);
        modal.present();

        modal.onDidDismiss((data: any[]) => {
            if (data) {
                this.excludeCrags = data;
                this.updateMap();
            }
        });
    }

    updateMap(){

    }
    // networkConnectivity() {
    //     var that = this;
    //     setInterval(() => {
    //         if (that.firstTime) {
    //             //that.loadCurrentPosition();
    //             //that.initializeCurrenPosition();
    //             that.loadMap();
    //             //that.loadCrags();
    //             that.autocomplete();
    //         } else {
    //             if (!that.isDisplayOfflineMode)
    //                 //that.autocomplete();
    //                 that.displayOffline();
    //         }
    //     }, 2000);
    // }

    //load map centered in current position
    loadMap() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.map = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 10
            };
            this.firstTime = false;
        }, (err) => {
        });
    }

    //auto complete function
    autocomplete() {
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete').getElementsByTagName('input')[0], { types: ["address"] });
            google.maps.event.addListener(autocomplete, 'place_changed', () => {
                let place = autocomplete.getPlace();
                this.map.lat = place.geometry.location.lat();
                this.map.lng = place.geometry.location.lng();
                //this.map.zoom = 12;
                console.log(place);
            });
        });
    }

    // displayOffline() {
    //     this.isDisplayOfflineMode = true;
    //     let alert = this.alertController.create({
    //         title: 'Συνδεσιμότητα Δικτύου',
    //         subTitle: 'Εκτός Δικτύου',
    //         buttons: [{
    //             text: 'Επανάληψη',
    //             handler: () => {
    //                 this.isDisplayOfflineMode = false;
    //             }
    //         }]
    //     });
    //     alert.present();
    // }

    //list fab button - show list nearby crags 
    showNearbyCrags() {
        this.navController.push(CragsListPage);
    }

    //navigate fab button - show current position pin button
    goToCurrentPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                name: 'Είμαι εδώ!',
                imagePath: '',
                icon: 'assets/images/markers/climber_mini.png',
                placeType: 'none',
                draggable: false,
                routes: []
            };
            this.crags.push(this.currentPosition);
            this.map.lat = position.coords.latitude;
            this.map.lng = position.coords.longitude;
            this.map.zoom = 16;
        });
        console.log(this.map.lat, this.map.lng);
    }

    initializeCurrenPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                name: 'Είμαι εδώ!',
                imagePath: '',
                icon: 'assets/images/markers/climber_mini.png',
                placeType: 'none',
                draggable: false,
                routes: []
            };
        });
    }

    cragClicked(crag: ICrag, index: number) {
        console.log('crag : ' + crag.name + ' index : ' + index);
    }

    //ability to drag draggable crag and save new location
    cragDragEnd(crag, event) {
        console.log('cragEnd ', crag, event);

        var updCrag: ICrag = {
            _id: crag._id,
            name: crag.name,
            lat: event.coords.lat,
            lng: event.coords.lng,
            imagePath: crag.imagePath,
            draggable: crag.draggable,
            placeType: crag.imagePath,
            icon: crag.icon,
            routes: crag.routes
        };
        console.log('C ', crag);
        console.log('UC ', updCrag);

        this.mapService.updateCrag(updCrag)
            .subscribe(data => {
            });
        console.log('UC ', updCrag);
    }

    //delete crag
    deleteCrag(crag) {
        var that = this;
        var crags = this.crags;

        let confirm = this.alertController.create({
            title: 'Διαγραφή Πεδίου?',
            message: 'Θέλετε να διαγράψετε το ' + crag.name + ' ?',
            buttons: [
                {
                    text: 'Άκυρο',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'ΟΚ',
                    handler: () => {
                        that.mapService.deleteCrag(crag._id.$oid)
                            .subscribe(data => {
                                if (data.n == 1) {
                                    for (var i = 0; i < crags.length; i++) {
                                        if (crags[i]._id == crag._id.$oid) {
                                            crags.splice(i, 1);
                                        }
                                    }
                                }
                                that.loadCrags();
                                this.totalCrags = this.crags.length;
                            });
                    }
                }
            ]
        });
        confirm.present();
    }

    //show spacific crag(marker)
    showCrag() {
        console.log(this.crag)
        this.map.zoom = 16;
        this.map.lat = this.crag.lat;
        this.map.lng = this.crag.lng;
        console.log(this.map.lat);
        console.log(this.map.lat);
    }

    //load crags from db
    loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
                this.totalCrags = this.crags.length;
                console.log(this.crags);
            });
    }

    //walk button on infoWindow navigate to choosen crag
    getDirections(crag) {
        console.log('Getting directions....');
        let destination = crag.lat + ',' + crag.lng;
        console.log('destination: ' + destination);
        //if we are running on ios use Apple Maps
        if (this.platform.is('ios')) {
            window.open('maps://?q=' + destination, '_system')
            //if we are running on android use Google Maps
        } else {
            let label = encodeURI('Το Πεδίο' + crag.name);
            window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
        }
    }

    //cloud button on infoWindow
    weatherForecast(crag) {
        console.log('getting weather forcast');
        this.navController.push(WeatherPage, { crag: crag });
    }

    //Info button on infowindow Open crag-details page
    getCragInfo(crag) {
        this.navController.push(CragDetailsPage, {
            crag: crag
        });
    }

    //show about page
    showAbout() {
        let popover = this.popoverController.create(AboutPopoverPage);
        popover.present({ ev: event });
    }
}
