import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';

import {MapService} from '../../services/map.service';
import {CragDetailsPage} from '../../pages/crag-details/crag-details.page';
import {AddCragPage} from '../../pages/add-crag/add-crag.page';
import {Crag} from '../../shared/interfaces'


@Component({
    selector:'page-crags',
    templateUrl:'crags.page.html'
})

export class CragsPage implements OnInit{
    
    crags:Crag[];
    constructor(public navController:NavController, private mapService:MapService){
        console.log('Constructing crags.....');
        this.loadCrags();
    }

    ngOnInit(){
        console.log('Initializing crags.....');
        this.loadCrags();
    }

    getCragInfo(crag){
        this.navController.push(CragDetailsPage, {
            crag:crag
        });
    }

    addCrag():void{
        this.navController.push(AddCragPage);
    }

    editCrag(crag):void{

    }

    deleteCrag(crag):void{

    }

    loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
        })
    }
}