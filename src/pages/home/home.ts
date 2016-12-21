import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { RoutesListPage } from '../../pages/pages';
import { MapService } from '../../services/map.service';
import 'rxjs/add/operator/debounceTime';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slideOptions: any;
  searching: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  crags: any;



  constructor(public navController: NavController, public mapService: MapService) {

    this.slideOptions = {
      loop: true,
      autoplay: 3000,
      pager: true
    };

    this.searchControl = new FormControl();
  }


  ionViewDidLoad() {
    this.setFilteredCrags();

    this.searchControl.valueChanges.debounceTime(700)
      .subscribe(search => {
        this.searching = false;
        this.setFilteredCrags();
      });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredCrags() {
    this.mapService.filterCrags(this.searchTerm)
      .then((crags) => {
        this.crags = crags;
      });
  }

  openRoutesListPage(routes) {
    this.navController.push(RoutesListPage,
      { routes: routes })
  }

}
