import { Component, OnInit } from '@angular/core';
import { NavController, ItemSliding, } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { MapService } from '../../services/map.service';
import { MappingsService } from '../../services/mappings.service';

import { AddCragPage, CragDetailsPage } from '../../pages/pages';
import { ICrag, IRoute } from '../../shared/interfaces'


@Component({
    selector: 'page-crags',
    templateUrl: 'crags.html'
})

export class CragsPage implements OnInit {

    searching: boolean = false;
    searchTerm: string = '';
    searchControl: FormControl;
    segment = 'all';
    routes: IRoute[];
    crags: any;
    crag: ICrag;
    userLat: any;
    userLng: any;

    constructor(public navController: NavController, public mapService: MapService, public mappingsService: MappingsService) {
        console.log('Constructing crags.....');
        this.getCurrentLocation();
        this.loadCrags();
        this.searchControl = new FormControl();
    }

    ngOnInit() {
        this.getCurrentLocation();
        this.loadCrags();
    }

    ionViewDidLoad() {
        this.loadCrags();

        this.searchControl.valueChanges.debounceTime(700)
            .subscribe(search => {
                this.searching = false;
                this.loadCrags();
            });
    }

    onSearchInput() {
        this.searching = true;
    }

    //load crags
    loadCrags() {
        var that = this;
        return new Promise(resolve => {
            this.mapService.filterCrags(this.searchTerm)
            .then((data) => {
                    that.crags = this.applyHaversine(data);
                    that.crags.sort((locationA, locationB) => {
                        return locationA.distance - locationB.distance;
                    });
                    resolve(that.crags)
                });
        });
    }

    //add button navigate to add-crag page
    addCrag(): void {
        this.navController.push(AddCragPage);
    }

    viewCragRoutes(_id: string) {
        console.log('viewing....');
    }

    editCrag(crag): void {

    }

    deleteCrag(crag): void {

    }

    //Haversine algorithm
    applyHaversine(locations) {
        let that = this;
        let userLocation = {
            lat: that.userLat,
            lng: that.userLng
        };
        //we have currentlocation
        console.log('inside haversine', that.userLat);
        console.log('inside haversine', that.userLng);

        locations.map((location) => {
            let cragLocation = {
                lat: location.lat,
                lng: location.lng
            };
            location.distance = this.getDistanceBetweenPoints(
                userLocation, cragLocation, 'km').toFixed(2);
        });
        return locations;
    }

    //Haversine algorithm
    getDistanceBetweenPoints(start, end, units) {
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        let R = earthRadius[units || 'km'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        return d;
    }

    toRad(x) {
        return x * Math.PI / 180;
    }
    //get users current location
    getCurrentLocation() {
        let that = this;
        navigator.geolocation.getCurrentPosition((position) => {
            that.userLat = position.coords.latitude;
            that.userLng = position.coords.longitude;
        });
    }
}