import { Component } from '@angular/core';

import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import { AddRoutePage, WeatherPage, CragsPage, MapPage, AddCragPage } from '../pages';
import { MapService } from '../../services/map.service';

import { ICrag, IRoute } from '../../shared/interfaces'


@Component({
    selector: 'crag-details',
    templateUrl: 'crag-details.html'
})

export class CragDetailsPage {

    crag: ICrag;
    crags: ICrag[];
    //routes:Route[];
    constructor(public navParams: NavParams, private navController: NavController,
        private mapService: MapService, public platform: Platform, public alertController: AlertController) {
        this.crag = this.navParams.get('crag');
    }

    showRouteDetails(route) {
        let alert = this.alertController.create({
            title: route.name,
            subTitle: `<p>Δυσκολία : ` + route.grade + `</p>
                <p>Ύψος διαδρομής : `+ route.heigth + `m</p>
                <p>Σετάκια : `+ route.qDraws + `</p>
                <p>Σχόλια : `+ route.info + `</p>`,
            buttons: ['OK']
        });
        alert.present();
    }

    editCrag(crag): void {
    this.navController.push(AddCragPage, {crag:crag});
    }

    deleteCrag(id) {

        console.log('Deleting.....');

        var result;
        var crags = this.crags;
        result = this.mapService.deleteCrag(id)
        result.subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < crags.length; i++) {
                    if (crags[i]._id == id) {
                        crags.splice(i, 1);
                    }
                }
            }
            this.loadCrags();
            this.navController.setRoot(CragsPage);

        },
            err => console.log(err),
            () => console.log('OK'))
    }

    addRouteToCrag(crag: ICrag) {
        this.navController.push(AddRoutePage, { crag: crag });
    }

    loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
            })
    }

    //cloud-sun button
    weatherForecast(crag) {
        console.log('getting weather forcast');
        this.navController.push(WeatherPage, { crag: crag });
    }

    //pin button
    showItOnMap(crag, rootPage) {
        this.navController.push(MapPage,
            { crag: crag });
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