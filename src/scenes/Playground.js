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

        let blockGroup = this.physics.add.group();
        let spikeGroup = this.physics.add.group();

        let scene = this;

        function makeBlock(x,y,w,h) {
            let block = scene.add.tileSprite(x,y,w,h, 'i_block').setOrigin(0,0);
            blockGroup.add(block);
            block.body.setImmovable();
        }

        function makeSpike(x,y) {
            let spike = scene.add.sprite(x,y, 'i_spike').setOrigin(0,0);
            spikeGroup.add(spike);
            spike.body.setImmovable();
        }

        makeBlock(0,0, game.config.width, 8);
        makeBlock(0, 32, 32, 32);
        makeBlock(32, 48, 60, 32);

        makeSpike(32,40);
        makeSpike(40,40);
        
        this.dood = this.physics.add.sprite(0,8, 'ss_dood', 1).setOrigin(0,0);

        this.dood.setVelocityX(10);
        this.dood.setVelocityY(10);

        this.physics.add.collider(this.dood, blockGroup);

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