
import "./style.css";
import Phaser from "phaser";

const TILE_SIZE = 18;

const PLAYER_ANIMS = {
  idle: "idle",
  walk: "walk",
  run: "run",
  jump: "jump",
  fall: "fall",
};

class MainScene extends Phaser.Scene {
  constructor() {
    super("main-scene");
    this.player;
    this.map;
    this.keyBinds;
  }

  preload() {
    this.load.atlas("robot", "robot.png", "robot.json");

    this.load.image("marble", "tilesets/marble.png");
    this.load.image("rock", "tilesets/rock.png");
    this.load.image("sand", "tilesets/sand.png");
    this.load.image("stone", "tilesets/stone.png");
    this.load.image("coin", "coin.png");
    this.load.tilemapTiledJSON("map", "tilesets/map.json");
  }

  create() {
    const { height, width } = this.scale;

    this.map = this.make.tilemap({ key: "map" });
    this.keyBinds;
    const marbleTiles = this.map.addTilesetImage("marble", "marble");
    const rockTiles = this.map.addTilesetImage("rock", "rock");
    const sandTiles = this.map.addTilesetImage("sand", "sand");
    const stoneTiles = this.map.addTilesetImage("stone", "stone");

    const BackgroundLayer = this.map.createLayer(
      "Background",
      [marbleTiles, rockTiles, sandTiles, stoneTiles],
      0,
      0
    );
    const platformLayer = this.map.createLayer(
      "Platforms",
      [marbleTiles, rockTiles, sandTiles, stoneTiles],
      0,
      0
    );

    platformLayer.setCollisionByProperty({ colllides: true });
    this.coins = this.physics.add.group({
			key: "coin",
			quantity: 12,
			setXY: { x: 18 * 4, y: 0, stepX: 18 * 3 },
			setScale: { x: 0.25, y: 0.25 },
      
		});
    this.coins.children.iterate((coin) => {
      coin
      .setCircle(40)
      .setCollideWorldBounds(true)
      .setBounce(Phaser.Math.FloatBetween(.4, .8))
      .setVelocityX(Phaser.Math.FloatBetween(-10, 10))
    })
    console.log(this.coins.quantity)
    if(this.coins.quantity === 0){this.coins.quantity = 12 }
    console.log("platformLayer", platformLayer)

    this.player = this.physics.add.sprite(
      width / 2,
      height / 2,
      "robot",
      "character_robot_idle.png"
    );

    this.physics.add.collider(this.player, platformLayer);
    
    this.physics.add.collider(this.coins, platformLayer);
    this.physics.add.collider(this.coins, this.coins);
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      undefined,
      this
    )

    this.player
      .setCollideWorldBounds(true)
      .setBounce(0.2)
      .setSize(TILE_SIZE * 2, TILE_SIZE * 4.5)
      .setScale(0.5)
      .setOffset(TILE_SIZE * 1.7, TILE_SIZE * 2.6);

    this.player.anims.create({
      key: "run",
      frames: this.player.anims.generateFrameNames("robot", {
        start: 0,
        end: 2,
        prefix: "character_robot_run",
        suffix: ".png",
      }),

      frameRate: 10,
      repeat: -1,
    });
    this.player.play("run");
    this.player.setCollideWorldBounds(true);

    this.player.anims.create({
      key: "walk",
      frames: this.player.anims.generateFrameNames("robot", {
        start: 0,
        end: 7,
        prefix: "character_robot_walk",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.player.play("walk");

    this.player.anims.create({
      key: PLAYER_ANIMS.idle,
      frames: [{ key: "robot", frame: "character_robot_idle.png" }],
    });

    this.player.anims.create({
      key: PLAYER_ANIMS.jump,
      frames: [{ key: "robot", frame: "character_robot_jump.png" }],
    });
    this.player.anims.create({
      key: PLAYER_ANIMS.fall,
      frames: [{ key: "robot", frame: "character_robot_fall.png" }],
    });
    // this.player.play("idle");

    this.keyBinds = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
      up: Phaser.Input.Keyboard.KeyCodes.W,
    });
  }

  update() {
    if (this.keyBinds.left.isDown || this.keyBinds.leftArrow.isDown) {
      this.player.setVelocityX(-150);
    } else if (this.keyBinds.right.isDown || this.keyBinds.rightArrow.isDown) {
      this.player.setVelocityX(150);
    } else {
      this.player.setVelocityX(0);
    }

    if (
      (this.keyBinds.jump.isDown ||
        this.keyBinds.upArrow.isDown ||
        this.keyBinds.up.isDown) &&
      this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-300);
    }

    // let x = this.player.body.velocity.x
    // let y = this.player.body.velocity.y

    let { x, y } = this.player.body.velocity;

    this.player.flipX = x < 0;
    console.log(x);
    if (this.player.body.onFloor()) {
      if (x === 0) {
        this.player.play(PLAYER_ANIMS.idle);
      } else {
        this.player.play(PLAYER_ANIMS.run, true);
      }
    } else {
      if (y < 0) {
        this.player.play(PLAYER_ANIMS.jump, true);
      } else {
        if (y > 0) {
          this.player.play(PLAYER_ANIMS.fall, true);
        }
      }
    }
  }
  collectCoin(player, coin) {
    coin.disableBody(true, true);
  
  }
  
}


/**@type {Phaser.Types.Core.GameConfig} */
const config = {
  type: Phaser.WEBGL,
  width: 44 * 18,
  height: 33 * 18,
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
