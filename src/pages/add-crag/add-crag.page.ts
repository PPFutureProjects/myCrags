import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map.page';

import { MapService } from '../../services/map.service';

@Component({
    selector: 'add-crag',
    templateUrl: 'add-crag.page.html'
})

export class AddCragPage {
    cragName: string;
    cragLat
    cragLng
    cragDraggable: string;
    crags;

    constructor(public navController: NavController, private mapService: MapService) {

    }

    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.cragLat = position.coords.latitude;
            this.cragLng = position.coords.longitude;
        });
    }
    addCrag() {
        console.log('Submiting.....');
        this.crags = this.loadCrags();
        var result;
        if (this.cragDraggable == 'yes') {
            var isDraggable = true;
        } else {
            var isDraggable = false;
        }

        var newCrag = {
            //_id:'',
            name: this.cragName,
            lat: parseFloat(this.cragLat),
            lng: parseFloat(this.cragLng),
            imagePath: 'unknown.jpg',
            draggable: isDraggable
        };

        result = this.mapService.addCrag(newCrag)
        result.subscribe(data => {
            newCrag = {
                // _id:data._id,
                name: this.cragName,
                lat: parseFloat(this.cragLat),
                lng: parseFloat(this.cragLng),
                imagePath: '',
                draggable: isDraggable
            }
            //newCrag._id=data._id;
            this.crags.push(newCrag);
            this.cragName = '';
            this.cragLat = '';
            this.cragLng = '';
            this.cragDraggable = '';
            //this.cragImagePath='';
            this.loadCrags();
            this.navController.setRoot(MapPage);
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