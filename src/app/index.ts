// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';

import { AppState } from './app.service';
import { MqSvc } from 'svc/mq.service';
import {StorageSvc} from 'svc/storage.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState, MqSvc, StorageSvc
];
