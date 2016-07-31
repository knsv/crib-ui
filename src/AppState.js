import { observable } from 'mobx';

class AppState {
  @observable timer = 0;
  @observable pageId = 'home';
  @observable events = [];

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }

  setPage(pageId) {
    console.log('Setting page to', pageId)
    this.pageId = pageId;
  }

  getPage() {
    return this.pageId;
  }

  setBuss(buss) {
    this.buss = buss;
  }

  getBuss() {
    return this.buss;
  }

  pushEvent(event) {
    event.date = new Date();
    this.events.push(event);
  }

  getEvents() {
    return this.events;
  }
}

export default AppState;
