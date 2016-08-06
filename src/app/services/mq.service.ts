import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";

const register = (name, bussUrl) => {
  console.log('Registering client ', name, ' to ', bussUrl);
  var io = require('socket.io-client');
  // var middleware = require('socketio-wildcard')();
  // io().use(middleware);
  var socket = io.connect(bussUrl, {reconnect: true});
  console.log('Connected client ', name, ' to ', bussUrl);
  socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
    console.log('Connected'); // data will be 'woot'
    socket.emit('REGISTER_CLIENT', name);
    console.log('Sent REGISTER_CLIENT client ', name, ' to ', bussUrl);
  });

  var patch = require('socketio-wildcard')(io.Manager);
  patch(socket);

  //socket.on('*', function(){ /* … */ })

  return socket;
};



@Injectable()
export class MqSvc {
  private events: Observable<Array>;
  constructor() {

    console.log('Constructed');
    console.log('Registering on buss');
    this.buss = register('crib-ui', 'http://127.0.0.1:8900');

    this.events = new Observable(observer => {
      this.buss.on('*', (data) => {
        //self.props.appState.pushEvent(data);
        //this.events.push(data);
        data.date = new Date();
        observer.next(data);

        console.log('EVENT => (next called)', data.data[0], ' ', data);
      });
    });
  }
  ngOnInit() {

  }

  hello(str:string) {
    console.log(str);
  }

  getEvents() {
    console.log(this.events);
    return this.events;
  }

  getBuss() {
    return this.buss;
  }

  emit(a,b) {
    return this.buss.emit(a,b);
  }
}

