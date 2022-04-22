import Page1Design from 'generated/pages/page1';
import { Route, Router } from '@smartface/router';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';
import { BLOCKS, MAX_RANK } from 'contants';
import FlBlock from 'components/FlBlock';
const { paddingLeft, paddingRight } = themeService.getStyle('#page1');
const BLOCK_COUNT = BLOCKS.length;

export default class Page1 extends Page1Design {
    blocks = [
        this.flBlock11,
        this.flBlock12,
        this.flBlock13,
        this.flBlock21,
        this.flBlock22,
        this.flBlock23,
        this.flBlock31,
        this.flBlock32,
        this.flBlock33
    ];
    initialized = false;
    save = {
        totalMoney: 0,
        prestige: 0,
        upgrades: {},
        rank: 1
    };
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    setBlock(flBlock: FlBlock, rank: number) {
        const maxBlockToShow = Math.ceil(rank / (MAX_RANK / BLOCK_COUNT));
        const blockImages = BLOCKS.slice(0, maxBlockToShow);
        const random = Math.max(0, Math.round(Math.random() * blockImages.length) - 1);
        // console.log('setBlock |||| MaxBlockToShow: ', maxBlockToShow, ' BlockImagesRange: ', blockImages.length, ' Random: ', random);
        flBlock.block = blockImages[random].image;
        flBlock.price = blockImages[random].price;
        flBlock.durability = blockImages[random].durability;
        flBlock.onClick = (pop) => {
            if (pop) {
                this.save.totalMoney += blockImages[random].price;
                this.setBlock(flBlock, this.save.rank);
            }
        };
    }

    initializeGame() {
        this.blocks.forEach((b) => this.setBlock(b, this.save.rank));
    }

    setWrapperHeight() {
        const wrapperWidth = Screen.width - paddingLeft + paddingRight;
        this.blockWrapper.height = wrapperWidth;
        // this.blockWrapper.dispatch({ type: 'updateUserStyle', userStyle: { height: wrapperWidth } });
        // [
        //     this.flBlock11,
        //     this.flBlock12,
        //     this.flBlock13,
        //     this.flBlock21,
        //     this.flBlock22,
        //     this.flBlock23,
        //     this.flBlock31,
        //     this.flBlock32,
        //     this.flBlock33
        // ].forEach((block) => {
        //     block.dispatch({ type: 'updateUserStyle', userStyle: { height: wrapperWidth / 3, width: wrapperWidth / 3 } });
        // });
        // this.blockWrapper.applyLayout();
    }

    onShow() {
        super.onShow();
        if (!this.initialized) {
            this.setWrapperHeight();
            this.initializeGame();
            this.initialized = true;
        }
    }

    onLoad() {
        super.onLoad();
    }

    onHide(): void { }
}
