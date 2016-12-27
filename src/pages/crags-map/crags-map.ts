import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

import { GoogleMaps } from '../services/pages';
import { MapService } from '../../services/map.service';
import { ConnectivityService } from '../../services/connectivity.service';
import { ICrag } from '../../shared/interfaces'

@Component({
  selector: 'page-crags-map',
  templateUrl: 'crags-map.html'
})
export class CragsMapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    
  }

}
