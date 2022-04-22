import { FlexLayoutEvents } from '@smartface/native/ui/flexlayout/flexlayout-events';
import { IImage } from '@smartface/native/ui/image/image';
import { CRACK_IMAGES, SOUND_HIT, SOUND_POPS } from 'contants';
import FlBlockDesign from 'generated/my-components/FlBlock';

export default class FlBlock extends FlBlockDesign {
    static durabilityPercentage = 0.33;
    pageName?: string | undefined;
    private _durability: number;
    private _currentDurability: number;
    private _price: number;
    private _onClick: (pop: boolean) => void;
    private _crackState = 0;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.on(FlexLayoutEvents.TouchEnded, () => {
            SOUND_HIT.play();
            const lastHit = this._currentDurability === 1;
            this._onClick && this._onClick(lastHit);
            this.setCrackImage();
            if (lastHit) {
                SOUND_POPS[Math.round(Math.random() * 1)].play();
            }
            this._currentDurability -= 1;
        });
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get durability(): number {
        return this._durability;
    }
    public set durability(value: number) {
        this._durability = value;
        this._currentDurability = value;
    }
    public get currentDurability(): number {
        return this._currentDurability;
    }
    public set currentDurability(value: number) {
        this._currentDurability = value;
    }
    public set block(value: IImage) {
        this.imgBlock.image = value;
        this._crackState = 0;
    }
    public set onClick(value: (pop: boolean) => void) {
        this._onClick = value;
    }
    setCrackImage() {
        const previousCrackState = this._crackState;
        const percentage = this._currentDurability / this._durability;
        if (percentage >= FlBlock.durabilityPercentage && percentage <= FlBlock.durabilityPercentage * 2) {
            this.imgCrack.image = CRACK_IMAGES.LOW[Math.round(Math.random() * 2)];
            this.imgCrack.visible = true;
            this._crackState = 1;
            if (previousCrackState !== this._crackState) {
                SOUND_POPS[Math.round(Math.random() * 1)].play();
            }
        }
        else if (percentage >= FlBlock.durabilityPercentage * 2) {
            this.imgCrack.image = CRACK_IMAGES.HIGH[Math.round(Math.random() * 2)];
            this.imgCrack.visible = true;
            this._crackState = 2;
            if (previousCrackState !== this._crackState) {
                SOUND_POPS[Math.round(Math.random() * 1)].play();
            }
        }
        else {
            this.imgCrack.visible = false;
        }
    }
}
