import {ComprateFrontendPage} from './app.po';

describe('comprate-frontend App', function () {
  let page: ComprateFrontendPage;

  beforeEach(() => {
    page = new ComprateFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
