import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-about-popover',
  templateUrl: 'about-popover.html'
})
export class AboutPopoverPage {

  constructor(public viewController: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello AboutPopoverPage Page');
  }

  close() {
    this.viewController.dismiss();
  }
}
