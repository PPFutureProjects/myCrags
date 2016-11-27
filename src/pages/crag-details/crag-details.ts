import {Component} from '@angular/core';

import {NavController,NavParams} from 'ionic-angular';

import { CragsPage } from '../crags/crags';

import {MapService} from '../../services/map.service';

import {Crag} from '../../shared/interfaces'


@Component({
    selector:'crag-details',
    templateUrl:'crag-details.html'
})

export class CragDetailsPage{
    
    crag:Crag;
    crags:Crag[];
    constructor(public navParams:NavParams, private navController:NavController, private mapService:MapService){
        this.crag=this.navParams.get('crag');
    }

    deleteCrag(id){
         
        console.log('Deleting.....');

        var result;
        var crags=this.crags;
        result=this.mapService.deleteCrag(id)
        result.subscribe(data=>{
            if(data.n==1){
                for(var i=0;i<crags.length;i++ ){
                    if(crags[i]._id==id){
                        crags.splice(i,1);
                    }
                }
            }
            this.loadCrags();
            this.navController.setRoot(CragsPage);

        },
        err=>console.log(err),
        ()=>console.log('OK'))
    }

    loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
        })
    }
}