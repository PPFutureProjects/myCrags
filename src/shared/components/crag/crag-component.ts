import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

import { Crag } from '../../interfaces';
import { MapService } from '../../../services/map.service'
import { CragDetailsPage, WeatherPage } from '../../../pages/pages';

@Component({
    selector: 'crag-card',
    templateUrl: 'crag-component.html'
})


export class CragComponent  {

    @Input() crag: Crag;
    @Output() onViewCragRoutes = new EventEmitter<string>();


    constructor(public mapService: MapService,
                public navController:NavController,
                public platform:Platform) {

    }

    //pin button
    showItOnMap(){
        
    }

    getCragInfo(event, crag) {
        this.navController.push(CragDetailsPage, {
            crag: crag
        });
    }    

    //routes button
    viewCragRoutes(_id:string){
        this.onViewCragRoutes.emit(_id);
    }
   
   //cloud-sun button
   weatherForecast(){
       console.log('getting weather forcast');
       this.navController.setRoot(WeatherPage);
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