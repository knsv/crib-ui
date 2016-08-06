import {Injectable, Inject} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {init, get, set} from "crib-storage";
import {MqSvc} from "svc/mq.service";

console.log('Order: 1');
@Injectable()
export class StorageSvc {
  constructor(mqSvc: MqSvc){
  // constructor(appState:AppState){
    console.log("storage",init);
    init(mqSvc.getBuss());
  }

  get(id){
    return get(id);
  }
  set(id,obj){
    return set(id, obj);
  }
}

