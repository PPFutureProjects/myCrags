import {Component, OnInit} from '@angular/core';

import {NavController, ItemSliding} from 'ionic-angular';

import {MapService} from '../../services/map.service';
import {CragDetailsPage} from '../../pages/crag-details/crag-details';
import {AddCragPage} from '../../pages/add-crag/add-crag';
import {Crag, Route} from '../../shared/interfaces'


@Component({
    selector:'page-crags',
    templateUrl:'crags.html'
})

export class CragsPage implements OnInit{

    segment = 'all';
    excludeCrags = [];
    queryText = '';
    routes:Route[];
    crags:Crag[];
    crag:Crag;
    constructor(public navController:NavController, private mapService:MapService){
        console.log('Constructing crags.....');
        this.loadCrags();
    }

    ngOnInit(){
        console.log('Initializing crags.....');
        this.loadCrags();
    }

    getCragInfo(crag:Crag){
        this.navController.push(CragDetailsPage, {
            crag:crag
        });
    }

    addCrag():void{
        this.navController.push(AddCragPage);
    }

    updateSchedule(){

    }
    
    addFavorite(slidingItem: ItemSliding, cragData){

    }

    addYolo(slidingItem: ItemSliding, cragData){

    }

    removeFavorite(slidingItem: ItemSliding, cragData, title){

    }

    removeYolo(slidingItem: ItemSliding, cragData, title){

    }

    editCrag(crag):void{

    }

    deleteCrag(crag):void{

    }

    updateCrags(){

    }

    loadCrags() {
        var that=this;
        this.mapService.getCrags()
            .subscribe(data => {
                that.crags = data;
        })
    }
}