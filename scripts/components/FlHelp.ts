import FlHelpDesign from 'generated/my-components/FlHelp';

export default class FlHelp extends FlHelpDesign {
    private _onCloseClick: () => void;
    private _onResetProgressClick: () => void;
    constructor(props?: any) {
        super(props);
        this.lblClose.on("touchEnded", () => {
            this._onCloseClick && this._onCloseClick();
        });
        this.lblResetProgress.on("touchEnded", () => {
            this._onResetProgressClick && this._onResetProgressClick();
        });
        this.tvHelp.text = 'Welcome to Block Breaker\n\nIn this game your main goal is to reach rank 100' +
            'You can mine from blocks below by clicking them.\n\nEvery block has own durability that means it takes X amount of clicks to break it. ' +
            'With each upgrade blocks changes and their value rises.' +
            '\n\nYou can enhant your pickaxe with fortune. Fortune has 3 levels. Each upgrade adds possibility to multiplication of breaked ore.' +
            '\n\nThere are 28 different blocks to unlock.' +
            '\n\nGood luck!';
    }
    set onCloseClick(value: () => void) {
        this._onCloseClick = value;
    }
    set onResetProgressClick(value: () => void) {
        this._onResetProgressClick = value;
    }
}
