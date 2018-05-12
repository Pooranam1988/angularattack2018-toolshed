import {Component, OnInit} from '@angular/core';
import {ListingsService} from "../listings.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listings

  constructor(private listingService: ListingsService) {
  }

  ngOnInit() {
    this.listingService.getAll().subscribe(({data}) => this.listings = data)
  }

}
