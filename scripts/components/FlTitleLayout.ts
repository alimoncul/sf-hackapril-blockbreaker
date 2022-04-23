import { FlexLayoutEvents } from '@smartface/native/ui/flexlayout/flexlayout-events';
import FlTitleLayoutDesign from 'generated/my-components/FlTitleLayout';

export default class FlTitleLayout extends FlTitleLayoutDesign {
    private _onHelpClick: () => void;
    constructor(props?: any) {
        super(props);
        this.flInfo.on(FlexLayoutEvents.TouchEnded, () => {
            this._onHelpClick && this._onHelpClick();
        });
    }
    set onHelpClick(value: () => void) {
        this._onHelpClick = value;
    }
    get title(): string {
        return this.lblTitle.text;
    }
    set title(value: string) {
        this.lblTitle.text = value;
    }
}
