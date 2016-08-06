import { Component, ViewChild } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {StorageSvc} from "../services/storage.service";
import {ChangeDetectorRef} from "@angular/core";

import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';
import {ModalDirective} from "ng2-bootstrap";
import {MqSvc} from "../services/mq.service";
import {Q} from "q";
//import {ModalDirective} from '../../../components/modal/modal.component';

@Component({
  selector: 'index',
  directives: [MODAL_DIRECTIVES, CORE_DIRECTIVES],
  viewProviders:[BS_VIEW_PROVIDERS],
  providers: [StorageSvc, MqSvc],
  templateUrl: './schedule.template.html'
})
export class Index {
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor(  private storageSvc: StorageSvc, private mqSvc: MqSvc, private ref: ChangeDetectorRef) {
    this.schedule = [];

    storageSvc.get('scheduler').then((_schedule)=>{
      console.log('Got result from storage.get');
      this.schedule = _schedule;
      this.schedule.forEach((trigger => {
        if(trigger.args){
          trigger.args = JSON.stringify(trigger.args);
        }
      });
      this.ref.detectChanges();
    });

    this.currentTrigger = {
      id:''
    };

    // this.storageSvc = storageSvc;
  }

  ngOnInit() {
    console.log('hello `Schedule` component');
  }


  format(arg){
    if(arg){
      return JSON.stringify(arg);
    }
  }

  edit(trigger){
    console.log('Editing item with id: ',trigger.id);
    this.currentTrigger = trigger;
  }

  save(){
    this.schedule.forEach((trigger => {
      if(trigger.args){
        trigger.args = JSON.parse(trigger.args);
      }
    });
    this.storageSvc.set('scheduler',this.schedule);
    this.mqSvc.emit('RESTART_SCHEDULER');
  }
}
