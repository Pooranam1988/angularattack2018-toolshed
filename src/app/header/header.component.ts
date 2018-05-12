import {Component, OnInit} from '@angular/core';
import {Jsonp, Request} from '@angular/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private jsonp: Jsonp) {
  }

  ngOnInit() {
  }

  onVote() {
    this.jsonp.request(new Request({
      method: 'POST',
      url: 'http://www.angularattack.com/entries/208-todo/vote/stats',
    })).subscribe(() => {});
  }

}
