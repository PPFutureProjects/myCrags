import { Injectable } from '@angular/core';

//mport { Crag, Route } from '../shared/interfaces';
import { MapService } from '../services/map.service';

@Injectable()
export class MappingsService {

    data: any;

    constructor(public mapService: MapService) { }

   
}