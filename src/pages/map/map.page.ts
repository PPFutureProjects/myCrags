import { Component, OnInit } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { CragDetailsPage } from '../../pages/crag-details/crag-details.page'
import { AboutPopoverPage } from '../../pages/about-popover/about-popover';
import { MapService } from '../../services/map.service';
import { Crag } from '../../shared/interfaces'

@Component({
    selector: 'page-map',
    templateUrl: 'map.page.html'
})
export class MapPage implements OnInit {
    //Zoom Level
    zoom: number = 10;
    //Start position
    lat: number = 38.1307068;
    lng: number = 23.7213821;
    //properties
    cragName: string;
    cragLat: string;
    cragLng: string;
    cragDraggable: string;
    cragImagePath: string;
    totalCrags;
    crags: Crag[];

    constructor(public navController: NavController,
        public popoverController: PopoverController,
        private mapService: MapService) {
        console.log('Constructing crags.....');
        this.loadCrags();
    }

    ngOnInit() {
        console.log('Initializing crags.....');
        this.loadCrags();
    }

    cragClicked(crag: Crag, index: number) {
        console.log('crag : ' + crag.name + ' index : ' + index);
    }

    cragDragEnd(crag, event) {
        console.log('cragEnd ', crag, event);

        var updCrag = {
            _id: crag._id,
            name: crag.name,
            lat: event.coords.lat,
            lng: event.coords.lng,
            imagePath: crag.imagePath,
            draggable: crag.draggable
        };
        console.log('C ', crag);
        console.log('UC ', updCrag);

        this.mapService.updateCrag(updCrag)
            .subscribe(data => {
            });
        console.log('UC ', updCrag);
    }

    // deleteCrag(event,crag){
    //         this.navController.push(CragDetailsPage,{
    //             crag:crag
    //         });
    //     }

    deleteCrag(event, crag) {
        var crags = this.crags;

        this.mapService.deleteCrag(crag._id.$oid)
            .subscribe(data => {
                if (data.n == 1) {
                    for (var i = 0; i < crags.length; i++) {
                        if (crags[i]._id == crag._id.$oid) {
                            crags.splice(i, 1);
                        }
                    }
                }
                this.loadCrags();
                this.totalCrags = this.crags.length;
            });
    }

    getCragInfo(event, crag) {
        this.navController.push(CragDetailsPage, {
            crag: crag
        });
    }

    loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
                this.totalCrags = this.crags.length;
                console.log(this.crags);
            });
    }

    getDirections() {
        console.log('Getting directions....')
    }

    showAbout() {
        let popover = this.popoverController.create(AboutPopoverPage);
        popover.present({ev:event});
    }
}