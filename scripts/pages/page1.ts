import Page1Design from 'generated/pages/page1';
import { Route, Router } from '@smartface/router';
import Image from '@smartface/native/ui/image';
const blocks = {
  noDamage: [
    Image.createFromFile('images://stone.png'),
    Image.createFromFile('images://chiseled.png'),
    Image.createFromFile('images://mossy.png'),
    Image.createFromFile('images://polished.png'),
    Image.createFromFile('images://andesite.png'),
    Image.createFromFile('images://blackstone.png'),
    Image.createFromFile('images://gilded_blackstone.png'),
    Image.createFromFile('images://sandstone.png'),
    Image.createFromFile('images://chiseled_sandstone.png'),
    Image.createFromFile('images://chiseled_red_sandstone.png'),
    Image.createFromFile('images://netherrack.png'),
    Image.createFromFile('images://endstone.png'),
    Image.createFromFile('images://obsidian.png'),
    Image.createFromFile('images://glowstone.png'),
    Image.createFromFile('images://coal.png'),
    Image.createFromFile('images://copper.png'),
    Image.createFromFile('images://iron_ore.png'),
    Image.createFromFile('images://redstone_ore.png'),
    Image.createFromFile('images://lapis_ore.png'),
    Image.createFromFile('images://gold_ore.png'),
    Image.createFromFile('images://diamond_ore.png'),
    Image.createFromFile('images://emerald_ore.png'),
    Image.createFromFile('images://redstone_block.png'),
    Image.createFromFile('images://lapis_block.png'),
    Image.createFromFile('images://gold_block.png'),
    Image.createFromFile('images://diamond_block.png'),
    Image.createFromFile('images://emerald_block.png'),
    Image.createFromFile('images://netherite_block.png'),
    Image.createFromFile('images://amethyst_block.png')
  ]
};

export default class Page1 extends Page1Design {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
  }

  onHide(): void {}
}
