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
    var that=this;
    // passed in array of track names that should be excluded (unchecked)
    let excludeCrags = this.navParams.data;

    console.log('exCrags', excludeCrags);

    this.mapService.getCrags().subscribe((crags) => {
      this.distinctCrags = crags;
      let dc = this.distinctCrags.map(item => item.placeType)
        .filter((value, index, self) => self.indexOf(value) === index);

      dc.forEach(crag => {
        excludeCrags.push({
          name: crag.placeType,
          isChecked: (excludeCrags.indexOf(crag.placeType) === -1)
        });
      });
      console.log('ec ', excludeCrags);
      console.log('dc ', dc);
    });
    // let excludeCrags = this.navParams.data;
    // var that=this;
    // console.log('exCrags', excludeCrags);

    // this.mapService.getCrags().subscribe((crags) => {
    //   console.log('B-dc ', crags);
    //   that.distinctCrags=crags;
      
    //   that.distinctCrags.map(crag => crag.placeType)
    //     .filter((value, index, self) => self.indexOf(value) === index).forEach(value => {
    //       console.log('I-dc ', crags);
    //       that.distinctCrags.push({
    //         name: value.placeType,
    //         isChecked: (excludeCrags.indexOf(value.placeType) === -1)
    //       });
    //     });
    //   console.log('ec ', excludeCrags);
    //   console.log('DC ', this.distinctCrags);
    //   console.log('A-dc ', crags);
    // });
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
