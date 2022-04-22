import BtnBuyDesign from 'generated/my-components/BtnBuy';

export default class BtnBuy extends BtnBuyDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
