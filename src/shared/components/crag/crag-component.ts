import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { ICrag } from '../../interfaces';
import { MapService } from '../../../services/map.service'
import { CragDetailsPage, WeatherPage, MapPage } from '../../../pages/pages';

@Component({
    selector: 'crag-card',
    templateUrl: 'crag-component.html'
})


export class CragComponent {

    @Input() crag: ICrag;
    @Output() onViewCragRoutes = new EventEmitter<string>();

    rootPage:boolean=false;

    constructor(public mapService: MapService,
        public navController: NavController,
        public platform: Platform) {
    }

    //pin button
    showItOnMap(crag, rootPage) {
        this.navController.push(MapPage, 
        {   crag:crag,
            rootPage:this.rootPage
        });
    }

    //information button
    getCragInfo(crag) {
        this.navController.push(CragDetailsPage, {
            crag: crag
        });
    }

    //routes button
    viewCragRoutes(_id: string) {
        this.onViewCragRoutes.emit(_id);
    }

    //cloud-sun button
    weatherForecast(crag) {
        console.log('getting weather forcast');
        this.navController.push(WeatherPage, { crag: crag });
    }

    //walk button
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

}