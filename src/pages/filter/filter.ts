import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { MapService } from '../../services/map.service';
import { MappingsService } from '../../services/mappings.service';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class FilterPage {

  crags: Array<{ name: string, isChecked: boolean }> = [];
  distinctCrags: any;

  constructor(public navParams: NavParams, public mapService: MapService, public mappingsService: MappingsService, public viewController: ViewController) {

    // passed in array of track names that should be excluded (unchecked)
    let excludeCrags = this.navParams.data;

    console.log('exCrags', excludeCrags);

    this.mapService.getCrags().subscribe((crags) => {
      console.log('B-dc ', crags);
      crags.map(crag => crag.placeType)
        .filter((value, index, self) => self.indexOf(value) === index).forEach(crag => {
          console.log('I-dc ', crags);
          this.crags.push({
            name: crag.placeType,
            isChecked: (excludeCrags.indexOf(crag.placeType) === -1)
          });
        });
      console.log('ec ', excludeCrags);
      console.log('A-dc ', crags);
    });
  }

  ionViewDidLoad() {
    console.log('Hello FilterPage Page');
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.crags.forEach(crag => {
      crag.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTrackNames = this.crags.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewController.dismiss(data);
  }

}
