import { FacturePage } from './app.po';

describe('facture App', () => {
  let page: FacturePage;

  beforeEach(() => {
    page = new FacturePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
