import Sound from '@smartface/native/device/sound';
import File from '@smartface/native/io/file';
import Path from '@smartface/native/io/path';
import Image from '@smartface/native/ui/image';

const SOUND_POP2 = new Sound();
const SOUND_POP2_FILE = new File({ path: Path.AssetsUriScheme + 'pop2.mp3' });
SOUND_POP2.loadFile(SOUND_POP2_FILE);

export const SOUND_BUY = new Sound();
const SOUND_BUY_FILE = new File({ path: Path.AssetsUriScheme + 'buy.mp3' });
SOUND_BUY.loadFile(SOUND_BUY_FILE);

export const SOUND_HITS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => {
    const SOUND_HIT = new Sound();
    const SOUND_HIT_FILE = new File({ path: Path.AssetsUriScheme + 'hit.mp3' });
    SOUND_HIT.loadFile(SOUND_HIT_FILE);
    return SOUND_HIT;
});

export const SOUND_POPS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((a, index) => {
    const SOUND_POP = new Sound();
    const SOUND_POP_FILE = new File({ path: Path.AssetsUriScheme + `pop${index % 2 === 0 ? 1 : 2}.mp3` });
    SOUND_POP.loadFile(SOUND_POP_FILE);
    return SOUND_POP;
});

export const BLOCKS = [
    { durability: 9, image: Image.createFromFile('images://stone.png'), price: 1 },
    { durability: 11, image: Image.createFromFile('images://chiseled.png'), price: 2 },
    { durability: 11, image: Image.createFromFile('images://mossy.png'), price: 4 },
    { durability: 11, image: Image.createFromFile('images://polished.png'), price: 5 },
    { durability: 11, image: Image.createFromFile('images://andesite.png'), price: 8 },
    { durability: 13, image: Image.createFromFile('images://blackstone.png'), price: 10 },
    { durability: 13, image: Image.createFromFile('images://gilded_blackstone.png'), price: 14 },
    { durability: 11, image: Image.createFromFile('images://sandstone.png'), price: 18 },
    { durability: 11, image: Image.createFromFile('images://chiseled_sandstone.png'), price: 22 },
    { durability: 11, image: Image.createFromFile('images://chiseled_red_sandstone.png'), price: 26 },
    { durability: 7, image: Image.createFromFile('images://netherrack.png'), price: 35 },
    { durability: 7, image: Image.createFromFile('images://endstone.png'), price: 40 },
    { durability: 15, image: Image.createFromFile('images://obsidian.png'), price: 200 },
    { durability: 5, image: Image.createFromFile('images://glowstone.png'), price: 80 },
    { durability: 9, image: Image.createFromFile('images://coal.png'), price: 120 },
    { durability: 9, image: Image.createFromFile('images://copper.png'), price: 150 },
    { durability: 9, image: Image.createFromFile('images://iron_ore.png'), price: 200 },
    { durability: 9, image: Image.createFromFile('images://redstone_ore.png'), price: 250 },
    { durability: 9, image: Image.createFromFile('images://lapis_ore.png'), price: 400 },
    { durability: 11, image: Image.createFromFile('images://gold_ore.png'), price: 650 },
    { durability: 11, image: Image.createFromFile('images://diamond_ore.png'), price: 1100 },
    { durability: 11, image: Image.createFromFile('images://emerald_ore.png'), price: 1500 },
    { durability: 11, image: Image.createFromFile('images://redstone_block.png'), price: 2000 },
    { durability: 15, image: Image.createFromFile('images://lapis_block.png'), price: 2500 },
    { durability: 15, image: Image.createFromFile('images://gold_block.png'), price: 4000 },
    { durability: 15, image: Image.createFromFile('images://diamond_block.png'), price: 9000 },
    { durability: 15, image: Image.createFromFile('images://emerald_block.png'), price: 12000 },
    { durability: 15, image: Image.createFromFile('images://netherite_block.png'), price: 20000 },
    { durability: 15, image: Image.createFromFile('images://amethyst_block.png'), price: 25000 }
];

export const MAX_RANK = 100;

export const CRACK_IMAGES = {
    LOW: [
        Image.createFromFile('images://crack_low_1.png'),
        Image.createFromFile('images://crack_low_2.png'),
        Image.createFromFile('images://crack_low_3.png')
    ],
    HIGH: [
        Image.createFromFile('images://crack_high_1.png'),
        Image.createFromFile('images://crack_high_2.png'),
        Image.createFromFile('images://crack_high_3.png')
    ]
};

export const RANKS = new Array(100).fill(0);