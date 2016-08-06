import { Schedule } from './schedule.component';
import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'schedule', component: Schedule,
  children: [
    { path: '', component: Index }
  ]
};
