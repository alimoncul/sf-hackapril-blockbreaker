import Page1Design from 'generated/pages/page1';
import { Route, Router } from '@smartface/router';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';
import { BLOCKS, MAX_RANK, RANKS } from 'contants';
import FlBlock from 'components/FlBlock';
import System from '@smartface/native/device/system';
import Dialog from '@smartface/native/ui/dialog';
import FlHelp from 'components/FlHelp';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { Data } from '@smartface/native/global';
import AlertView from '@smartface/native/ui/alertview';
const { paddingLeft, paddingRight } = themeService.getStyle('#page1');
const BLOCK_COUNT = BLOCKS.length;
const STARTER_STATE = {
    totalMoney: 10,
    rank: 1,
    fortune: 0
};

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
    save = Object.assign({}, STARTER_STATE);
    rankPrices = [];
    menuDialog: Dialog;
    helpMenu: FlHelp;
    fortunePrices = [100, 10000, 25000];
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    initHelpMenu() {
        this.menuDialog = new Dialog({
            android: {
                themeStyle: Dialog.Android.Style.ThemeNoHeaderBarWithTranslucentDecor
            }
        });
        const component = new FlHelp();
        themeService.addGlobalComponent(component, 'flDialog');
        themeService.addGlobalComponent(this.menuDialog.layout, 'dialog');
        (this.menuDialog.layout as StyleContextComponentType<FlexLayout>).dispatch({
            type: 'pushClassNames',
            classNames: '.dialog'
        });
        this.menuDialog.android.isTransparent = false;
        component.onTouch = () => {
            return true;
        };
        //@ts-ignore
        this.menuDialog.layout.addChild(component, 'helpDialog');
        this.menuDialog.layout.applyLayout();

        this.flTitleLayout.onHelpClick = () => {
            this.menuDialog.show();
        };
        component.onCloseClick = () => this.menuDialog.hide();
        component.onResetProgressClick = () => alert({
            title: 'Reset Progress',
            message: 'Are you sure you want to reset all your progress?',
            buttons: [
                {
                    text: 'Cancel',
                    type: AlertView.Android.ButtonType.NEGATIVE
                },
                {
                    text: 'Yes',
                    type: AlertView.Android.ButtonType.POSITIVE,
                    onClick: () => {
                        if (System.OS === System.OSType.IOS) {
                            alert({
                                title: 'Reset Progress',
                                message: 'Are you really really sure?',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        type: AlertView.Android.ButtonType.NEGATIVE
                                    },
                                    {
                                        text: 'YES!',
                                        type: AlertView.Android.ButtonType.POSITIVE,
                                        onClick: () => this.resetProgress()
                                    }
                                ]
                            });
                        }
                        else {
                            this.resetProgress();
                        }
                    }
                }
            ]
        });
    }

    resetProgress() {
        this.save = Object.assign({}, STARTER_STATE);
        Data.setStringVariable('save', JSON.stringify(this.save));
        this.initializeGame();
    }

    setBlock(flBlock: FlBlock, rank: number) {
        const maxBlockToShow = Math.ceil(rank / (MAX_RANK / BLOCK_COUNT));
        const blockImages = BLOCKS.slice(0, maxBlockToShow);
        const random = Math.max(Math.max(0, blockImages.length - 4), Math.round(Math.random() * blockImages.length) - 1);
        flBlock.block = blockImages[random].image;
        flBlock.price = blockImages[random].price;
        flBlock.durability = blockImages[random].durability;
        flBlock.onClick = (pop) => {
            if (pop) {
                this.save.totalMoney += (blockImages[random].price * this.calculateFortune());
                this.setBlock(flBlock, this.save.rank);
                this.updateMoneyTitle();
            }
        };
    }

    calculateFortune() {
        const random = Math.random();
        if (this.save.fortune === 1) {
            if (random <= 0.05) {
                return 3;
            }
            else if (random <= 0.2 && random > 0.05) {
                return 2;
            }
            else {
                return 1;
            }
        }
        else if (this.save.fortune === 2) {
            if (random <= 0.1) {
                return 3;
            }
            else if (random <= 0.35 && random > 0.1) {
                return 2;
            }
            else {
                return 1;
            }
        }
        else if (this.save.fortune === 3) {
            if (random <= 0.2) {
                return 3;
            }
            else if (random <= 0.6 && random > 0.2) {
                return 2;
            }
            else {
                return 1;
            }
        }
        else {
            return 1;
        }
    }

    initUpgradeFortuneButton() {
        this.btnFortune.onClick = () => {
            if (this.save.totalMoney >= this.fortunePrices[this.save.fortune] && this.save.fortune !== this.fortunePrices.length) {
                this.save.totalMoney -= this.fortunePrices[this.save.fortune];
                this.save.fortune += 1;
                this.updateMoneyTitle();
                this.updateUpgradeMineTitle();
                this.updateFortuneTitle();
                this.updateUpgradeFortuneTitle();
            }
        };
    }

    initUpgradeMineButton() {
        this.btnUpgradeMine.onClick = () => {
            if (this.save.totalMoney >= this.rankPrices[this.save.rank] && this.save.rank !== MAX_RANK) {
                this.save.totalMoney -= this.rankPrices[this.save.rank];
                this.save.rank += 1;
                this.updateMoneyTitle();
                this.updateUpgradeMineTitle();
                this.updateRankTitle();
                this.blocks.forEach((block) => this.setBlock(block, this.save.rank));
            }
        };
    }

    formatter(money: number) {
        return new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(money);
    }

    updateMoneyTitle() {
        this.flTitleLayout.title = `${this.formatter(this.save.totalMoney)}`;
    }

    updateUpgradeMineTitle() {
        if (this.save.rank === MAX_RANK) {
            this.btnUpgradeMine.title = 'MAX RANK!';
        }
        else {
            this.btnUpgradeMine.title = `Upgrade Mine (${this.formatter(this.rankPrices[this.save.rank])})`;
        }
    }

    updateUpgradeFortuneTitle() {
        if (this.save.fortune === this.fortunePrices.length) {
            this.btnFortune.title = 'MAX FORTUNE!';
        }
        else {
            this.btnFortune.title = `Enchant Fortune (${this.formatter(this.fortunePrices[this.save.fortune])})`;
        }
    }

    updateRankTitle() {
        if (this.save.rank === MAX_RANK) {
            this.lblRank.text = 'MAX RANK!';
        }
        else {
            this.lblRank.text = `Rank ${this.save.rank}/${MAX_RANK}`;
        }
    }

    updateFortuneTitle() {
        if (this.save.fortune === this.fortunePrices.length) {
            this.lblFortune.text = 'MAX FORTUNE!';
        }
        else {
            this.lblFortune.text = `Fortune ${this.save.fortune}/${this.fortunePrices.length}`;
        }
    }

    initRankPrices() {
        for (let i = 0; i <= RANKS.length; i++) {
            if (this.rankPrices.length) {
                this.rankPrices.push(Math.round((this.rankPrices[i - 1] + 1) * 1.12));
            }
            else {
                this.rankPrices.push((i + 1) * 3);
            }
        }
    }

    loadSave() {
        try {
            const save = Data.getStringVariable('save');
            const parsed = JSON.parse(save);
            if (parsed && Object.keys(parsed || {}).length) {
                this.save = parsed;
            }
        }
        catch (error) {
            this.save = Object.assign({}, STARTER_STATE);
        }
    }

    initializeGame() {
        this.loadSave();
        this.initRankPrices();
        this.initUpgradeMineButton();
        this.initUpgradeFortuneButton();
        this.updateMoneyTitle();
        this.updateUpgradeMineTitle();
        this.updateFortuneTitle();
        this.updateUpgradeFortuneTitle();
        this.updateRankTitle();
        this.blocks.forEach((b) => this.setBlock(b, this.save.rank));
    }

    setWrapperHeight() {
        const wrapperWidth = Screen.width - paddingLeft - paddingRight;
        this.blockWrapper.dispatch({ type: 'updateUserStyle', userStyle: { height: wrapperWidth } });
        System.OS === System.OSType.ANDROID && this.blockWrapper.applyLayout();
    }

    onShow() {
        super.onShow();
        if (!this.initialized) {
            this.initHelpMenu();
            this.setWrapperHeight();
            this.initializeGame();
            this.initialized = true;
        }
    }

    onLoad() {
        super.onLoad();
    }

    onHide(): void {
        Data.setStringVariable('save', JSON.stringify(this.save));
    }
}
