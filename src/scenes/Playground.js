class Playground extends Phaser.Scene {
    constructor() {
        super("playground");
    }

    preload() {
        this.load.spritesheet('ss_dood', 'assets/dood.png', {
            frameWidth: 10,
            frameHeight: 16,
        });

        this.load.image('i_spike', 'assets/spike.png');
        this.load.image('i_block', 'assets/block.png');
    }

    create() {

        this.anims.create({
            key: 'a_walk',
            frames: 'ss_dood',
            frameRate: 10,
            repeat: -1
        });

        this.add.sprite(8,8, 'i_spike').setOrigin(0,0);
        this.add.tileSprite(16,24,64,16, 'i_block').setOrigin(0,0);

        this.dood = this.add.sprite(0,8, 'ss_dood', 1).setOrigin(0,0);

        this.dood.anims.play('a_walk');

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(this.cursors.left.isDown) {
            this.dood.flipX = true;
            this.dood.anims.play('a_walk', true);
        } else if(this.cursors.right.isDown) {
            this.dood.flipX = false;
            this.dood.anims.play('a_walk', true);
        }
    }
}