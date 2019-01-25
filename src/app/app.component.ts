import { Component, OnInit } from '@angular/core';

import {GlobalEventService} from './global-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = true;

  constructor(private globalevent: GlobalEventService) {}

  ngOnInit() {
    this.globalevent.showLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }
}
