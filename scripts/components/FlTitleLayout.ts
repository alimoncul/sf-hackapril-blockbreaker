import FlTitleLayoutDesign from 'generated/my-components/FlTitleLayout';

export default class FlTitleLayout extends FlTitleLayoutDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
