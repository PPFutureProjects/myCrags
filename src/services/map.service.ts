import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Route } from '../shared/interfaces';

@Injectable()
export class MapService {
    apiKey: string;
    cragsUrl: string;
    routesUrl: string;

    constructor(private http: Http) {
        this.apiKey = 'UT8zWAvAS-I7BFIqMLYZa3GoTKse0uXt';
        this.cragsUrl = 'https://api.mlab.com/api/1/databases/meanmap/collections/crags';
        this.routesUrl = 'https://api.mlab.com/api/1/databases/meanmap/collections/routes';
        console.log('Service Connected....');
    }
    
    //get all crags
    getCrags() {
        return this.http.get(this.cragsUrl + '?apiKey=' + this.apiKey)
            .map(res => res.json());
    }

    //add new crag
    addCrag(newCrag) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.cragsUrl + '?apiKey=' + this.apiKey, JSON.stringify(newCrag), { headers: headers })
            .map(res => res.json());
    }

    //update crag
    updateCrag(updCrag) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.cragsUrl + '/' + updCrag._id.$oid + '?apiKey=' + this.apiKey, JSON.stringify(updCrag), { headers: headers })
            .map(res => res.json());
    }

    //delete crag
    deleteCrag(id) {
        return this.http.delete(this.cragsUrl + '/' + id + '?apiKey=' + this.apiKey)
            .map(res => res.json());
    }

    //add route to collection crags/routes[]
    addRouteToCrag(newRoute) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.routesUrl + '?apiKey=' + this.apiKey, JSON.stringify(newRoute), { headers: headers })
            .map(res => res.json());
    }

    //add route to collection routes
    addRoute(route) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.cragsUrl + '/' + route.cragId.$oid + '?apiKey=' + this.apiKey, JSON.stringify({ $push: { "routes": route } }), { headers: headers })
            .map(res => res.json());
    }
}
