import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MqSvc } from '../services/mq.service.ts';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'diagnostics',
  styles: [`
  `],
  providers: [MqSvc],

  templateUrl: './diagnostics.template.html'
})
export class Diagnostics {
  localState;
  events = [];
  constructor(public route: ActivatedRoute, private mqSvc: MqSvc) {

  }

  ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    this.mqSvc.getEvents().subscribe((event)=>{
        this.events.push(event);
      });


    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

  formatData(data){
    if(data){
      return JSON.stringify(data);
    }
  }

}
