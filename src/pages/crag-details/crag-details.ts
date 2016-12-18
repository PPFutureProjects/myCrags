import {Component} from '@angular/core';

import {NavController,NavParams} from 'ionic-angular';

import { CragsPage } from '../crags/crags';
import { AddRoutePage } from '../add-route/add-route';
import {MapService} from '../../services/map.service';

import {ICrag, IRoute} from '../../shared/interfaces'


@Component({
    selector:'crag-details',
    templateUrl:'crag-details.html'
})

export class CragDetailsPage{
    
    crag:ICrag;
    crags:ICrag[];
    //routes:Route[];
    constructor(public navParams:NavParams, private navController:NavController, private mapService:MapService){
        this.crag=this.navParams.get('crag');
       //this.crag.routes=this.navParams.get('routes');
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

    addRouteToCrag(crag:ICrag){
        this.navController.push(AddRoutePage,{crag:crag});
    }

    loadCrags() {
        this.mapService.getCrags()
            .subscribe(data => {
                this.crags = data;
        })
    }
}