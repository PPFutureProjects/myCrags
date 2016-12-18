import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { CragsPage } from '../crags/crags';

import { MapService } from '../../services/map.service';
import { ICrag, IRoute } from '../../shared/interfaces';

@Component({
    selector: 'add-crag',
    templateUrl: 'add-crag.html'
})

export class AddCragPage {
    cragName: string;
    cragLat
    cragLng
    cragDraggable: string;
    crags: ICrag[];
    routes: IRoute[] = [];
    cragPlaceType;
    cragIcon;
    iconPath:string='assets/images/markers/'
    cragMarker: string = 'crag.png'
    parkingMarker: string = 'parking.png'
    camping_areaMarker: string = 'camping_area.png'

    constructor(public navController: NavController, private mapService: MapService) {
        this.loadCrags();
    }

    //get user's current location
    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.cragLat = position.coords.latitude;
            this.cragLng = position.coords.longitude;
        });
    }

    //add crag button
    addCrag() {
        console.log('Submiting.....');
        var result;

        //set if marker draggable
        if (this.cragDraggable == 'yes') {
            var isDraggable = true;
        } else {
            var isDraggable = false;
        }

        //set markers icon
        if (this.cragPlaceType == 'crag') {
            this.cragIcon = this.cragMarker;
        } else if (this.cragPlaceType == 'parking') {
            this.cragIcon = this.parkingMarker;
        } else if(this.cragPlaceType == 'camping_area') {
            this.cragIcon = this.camping_areaMarker;
        } else {
            this.cragIcon = this.cragMarker;
        }

        var newCrag:ICrag = {
            name: this.cragName,
            lat: parseFloat(this.cragLat),
            lng: parseFloat(this.cragLng),
            placeType: this.cragPlaceType,
            imagePath: 'unknown.jpg',
            icon:this.iconPath+this.cragIcon,
            draggable: isDraggable,
            routes: this.routes
        };

        result = this.mapService.addCrag(newCrag)
        result.subscribe(data => {
            newCrag = {
                name: this.cragName,
                lat: parseFloat(this.cragLat),
                lng: parseFloat(this.cragLng),
                placeType: this.cragPlaceType,
                imagePath: '',
                icon: this.cragIcon,
                draggable: isDraggable,
                routes: this.routes
            }
            this.crags.push(newCrag);
            this.cragName = '';
            this.cragLat = '';
            this.cragLng = '';
            //this.cragDraggable = '';
            //this.cragImagePath='';
            this.loadCrags();
            this.navController.setRoot(CragsPage);
        },
            err => console.log(err),
            () => console.log('OK'))
    }

    loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
            })
    }

}