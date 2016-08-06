import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'schedule',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class Schedule {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Schedule` component');
  }


}
