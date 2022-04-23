import System from '@smartface/native/device/system';
import { FlexLayoutEvents } from '@smartface/native/ui/flexlayout/flexlayout-events';
import { IImage } from '@smartface/native/ui/image/image';
import { ImageFillType } from '@smartface/native/ui/imageview/imageview';
import { CRACK_IMAGES, SOUND_HITS, SOUND_POPS } from 'contants';
import FlBlockDesign from 'generated/my-components/FlBlock';

export default class FlBlock extends FlBlockDesign {
    static durabilityPercentage = 0.34;
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
            const soundToPlay = Math.round(Math.random() * 14);
            SOUND_HITS[soundToPlay].play();
            System.OS === System.OSType.IOS && setTimeout(() => SOUND_HITS[soundToPlay].stop(), 250);
            const lastHit = this._currentDurability === 1;
            this._onClick && this._onClick(lastHit);
            this.setCrackImage();
            if (lastHit) {
                SOUND_POPS[soundToPlay].play();
                System.OS === System.OSType.IOS && setTimeout(() => SOUND_POPS[soundToPlay].stop(), 250);
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
        this.imgCrack.visible = false;

        this.imgBlock.dispatch({
            type: 'updateUserStyle', userStyle: {
                imageFillType: ImageFillType.ASPECTFIT
            }
        });
        this.imgCrack.dispatch({
            type: 'updateUserStyle', userStyle: {
                imageFillType: ImageFillType.ASPECTFIT
            }
        });
    }
    public set onClick(value: (pop: boolean) => void) {
        this._onClick = value;
    }
    setCrackImage() {
        const percentage = this._currentDurability / this._durability;
        if (percentage >= FlBlock.durabilityPercentage && percentage <= FlBlock.durabilityPercentage * 2 && !isNaN(percentage) && this._crackState !== 1) {
            this.imgCrack.image = CRACK_IMAGES.LOW[Math.round(Math.random() * 2)];
            this.imgCrack.visible = true;
            this._crackState = 1;
        }
        else if (percentage <= FlBlock.durabilityPercentage && !isNaN(percentage) && this._crackState !== 2) {
            this.imgCrack.image = CRACK_IMAGES.HIGH[Math.round(Math.random() * 2)];
            this.imgCrack.visible = true;
            this._crackState = 2;
        }
    }
}
