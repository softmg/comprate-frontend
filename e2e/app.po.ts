import {browser, element, by} from 'protractor';

export class ComprateFrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app')).getText();
  }
}
