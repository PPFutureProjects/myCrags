import { Injectable } from '@angular/core';

//mport { Crag, Route } from '../shared/interfaces';
import { MapService } from '../services/map.service';

@Injectable()
export class MappingsService {

    data: any;

    constructor(public mapService: MapService) { }

    getDistinctValues(array[]) {
        return array.map(item => item)
            .filter((value, index, self) => self.indexOf(value) === index);
    }

}