import { ButtonEvents } from '@smartface/native/ui/button/button-events';
import BtnCustomDesign from 'generated/my-components/BtnCustom';

export default class BtnCustom extends BtnCustomDesign {
    private _onClick: () => void;
    constructor(props?: any) {
        super(props);
        this.on(ButtonEvents.TouchEnded, () => {
            this._onClick && this._onClick();
        });
    }
    public set onClick(value: () => void) {
        this._onClick = value;
    }
    get title(): string {
        return this.text;
    }
    set title(value: string) {
        this.text = value;
    }
}
