import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'page-crags-list',
  templateUrl: 'crags-list.html'
})
export class CragsListPage {

  crags: any;
  userLat: any;
  userLng: any;

  constructor(public navCtrl: NavController, public mapService: MapService, ) {
    this.getCurrentLocation();
    this.loadCrags();
  }

  ionViewDidLoad() {
    console.log('Hello CragsListPage Page');
  }


  //load crags
  loadCrags() {
    var that = this;
    return new Promise(resolve => {
      this.mapService.getCrags()
        .subscribe(data => {
          that.crags = this.applyHaversine(data);
          that.crags.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          });
          resolve(that.crags)
        });
    });
  }

  //Haversine algorithm
  applyHaversine(locations) {
    let that = this;
    let userLocation = {
      lat: that.userLat,
      lng: that.userLng
    };
    //we have currentlocation
    console.log('inside haversine', that.userLat);
    console.log('inside haversine', that.userLng);

    locations.map((location) => {
      let cragLocation = {
        lat: location.lat,
        lng: location.lng
      };
      location.distance = this.getDistanceBetweenPoints(
        userLocation, cragLocation, 'km').toFixed(2);
    });
    return locations;
  }

  //Haversine algorithm
  getDistanceBetweenPoints(start, end, units) {
    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
  }
  //calculation forv Haversine algorithm
  toRad(x) {
    return x * Math.PI / 180;
  }

  //get user's current location
  getCurrentLocation() {
    let that = this;
    navigator.geolocation.getCurrentPosition((position) => {
      that.userLat = position.coords.latitude;
      that.userLng = position.coords.longitude;
    });
  }

}
