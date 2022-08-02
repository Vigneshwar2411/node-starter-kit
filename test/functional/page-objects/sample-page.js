import { Selector } from 'testcafe';

export default class SamplePage {
  constructor() {
    this.headerLogo = Selector('.mrcooper-logo');
    this.appName = Selector('.app-logo');
    this.userName = Selector('.user-name');
  }
}
