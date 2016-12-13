import { Injectable } from '@angular/core';

import { Crag, Route } from '../shared/interfaces';
import { MapService } from '../services/map.service';

@Injectable()
export class MappingsService {

    data: any;

    constructor(public mapService: MapService) { }

   
}