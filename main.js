import "./style.css";
import Phaser from "phaser";

const TILE_SIZE = 18;
const WIDTH = 44 * TILE_SIZE;
const HEIGHT = 33 * TILE_SIZE;

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
    this.coins;
    this.bigPowerUp;
    this.tinnyPowerUp;
    this.music;
    this.jumpNoice;
    this.coinNoice;
    this.powerUpNoice;
  }

  preload() {
    this.load.atlas("robot", "robot.png", "robot.json");
    this.load.atlas("atom guy", "atom.png", "atom.json");
    this.load.atlas("hydrogen", "hydrogen.png", "atom.json");
    this.load.image("marble", "tilesets/marble.png");
    this.load.image("rock", "tilesets/rock.png");
    this.load.image("sand", "tilesets/sand.png");
    this.load.image("stone", "tilesets/stone.png");
    this.load.image("coin", "coin.png");
    this.load.image("mCoin", "-coin.png");
    this.load.image("bigPowerUp", "big-power-up.png");
    this.load.image("speed", "speed-power-up.png");
    this.load.image("tinnyPowerUp", "Tinny-power-up.png");
    this.load.tilemapTiledJSON("map", "tilesets/map.json");
    this.load.audio("music", "background-music.mp3");
    this.load.audio("Jump noice", "jump.wav");
    this.load.audio("coin noice", "coin.mp3");
    this.load.audio("power up noice", "Pop.mp3");
  }

create() {


this.nutron = 0;
this.elment = "hydrogen";

let playerSpawn = {
      x: WIDTH / 2,
      y: HEIGHT / 2,
    };


    this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
    this.music = this.sound.add("music", {
      loop: true,
      volume: 0.5,
    });
    this.jumpNoice = this.sound.add("Jump noice", {
      volume: 0.5,
    });
    this.powerUpNoice = this.sound.add("power up noice", {});
    this.coinNoice = this.sound.add("coin noice", {});
    this.music.play();
    const { height, width } = this.scale;

    this.map = this.make.tilemap({ key: "map" });
    const objectLayer = this.map.getObjectLayer("Objects");
    objectLayer.objects.forEach((o) => {
      const { x = 0, y = 0, name, width = 0, height = 0 } = o;
      switch (name) {
        case "player-spawn":
          playerSpawn.x = x + width / 2;
          playerSpawn.y = y + height / 2;
      }
    });
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
    this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
    platformLayer.setCollisionByProperty({ colllides: true });
    this.coins = this.physics.add.group({
      key: "coin",
      quantity: 200,
      setXY: { x: 18 * 4, y: 18 * 4, stepX: 18 * 2, stepY: 18 * 2 },
      setScale: { x: .03, y: 0.03 },
      
    });

    this.coins.children.iterate((coin) => {
      coin
        .setCircle(400)
        .setOffset(TILE_SIZE * 0.7, TILE_SIZE * 0.8)
        .setCollideWorldBounds(true)
        .setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
        .setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    });
    this.physics.world.setBounds(0, 0, WIDTH, HEIGHT);
    platformLayer.setCollisionByProperty({ colllides: true });
    this.mCoins = this.physics.add.group({
      key: "mCoin",
      quantity: 200,
      setXY: { x: 18 * 4, y: 18 * 4, stepX: 18 * 2, stepY: 18 * 2 },
      setScale: { x: .03, y: 0.03 },
      
    });

    this.mCoins.children.iterate((mCoin) => {
      mCoin
        .setCircle(400)
        .setOffset(TILE_SIZE * 0.7, TILE_SIZE * 0.8)
        .setCollideWorldBounds(true)
        .setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
        .setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    });

    // platformLayer.setCollisionByProperty({ colllides: true });
    // this.bigPowerUp = this.physics.add.group({
    //   key: "bigPowerUp",
    //   quantity: 1,
    //   setXY: { x: 18 * 4, y: 0, stepX: 18 * 3 },
    //   setScale: { x: 0.25, y: 0.25 },
    // });
    // this.bigPowerUp.children.iterate((bigPowerUp) => {
    //   bigPowerUp
    //     .setCollideWorldBounds(true)
    //     .setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
    //     .setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    // });
    // platformLayer.setCollisionByProperty({ colllides: true });
    // this.speedPowerUp = this.physics.add.group({
    //   key: "speed",
    //   quantity: 10,
    //   setXY: { x: 18 * 4, y: 0, stepX: 18 * 3 },
    //   setScale: { x: 0.25, y: 0.25 },
    //   colected: false,
    // });
    // this.speedPowerUp.children.iterate((speedPowerUp) => {
    //   speedPowerUp
    //     .setCollideWorldBounds(true)
    //     .setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
    //     .setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    // });
    // platformLayer.setCollisionByProperty({ colllides: true });
    // this.tinnyPowerUp = this.physics.add.group({
    //   key: "tinnyPowerUp",
    //   quantity: 10,
    //   setXY: { x: 18 * 4, y: 0, stepX: 18 * 3 },
    //   setScale: { x: 0.1, y: 0.1 },
    // });
    // this.tinnyPowerUp.children.iterate((tinnyPowerUp) => {
    //   tinnyPowerUp
    //     .setCollideWorldBounds(true)
    //     .setBounce(Phaser.Math.FloatBetween(0.4, 0.8))
    //     .setVelocityX(Phaser.Math.FloatBetween(-10, 10));
    // });

    this.player = this.physics.add.sprite(
      playerSpawn.x,
      playerSpawn.y,
      "atom guy",
      "atom io s1.png"
    );
    this.hydrogen = this.physics.add.sprite(
      playerSpawn.x,
      playerSpawn.y,
      
      "hydrogen",
      "hydrogen-idle1.png"
    );

    // this.physics.add.collider(this.player, platformLayer);

    this.physics.add.collider(this.coins, platformLayer);
    // this.physics.add.collider(this.bigPowerUp, platformLayer);
    this.physics.add.collider(this.coins, this.coins);
    this.physics.add.collider(this.mCoins, this.mCoins);
    this.physics.add.collider(this.mCoins, this.hydrogen);
    this.physics.add.collider(this.coins, this.hydrogen);
    // this.physics.add.collider(this.player, this.hydrogen);
    // this.physics.add.collider(this.bigPowerUp, this.coins);
    // this.physics.add.collider(this.speedPowerUp, this.coins);
    // this.physics.add.collider(this.tinnyPowerUp, this.coins);
    // this.physics.add.collider(this.speedPowerUp, this.bigPowerUp);
    // this.physics.add.collider(this.speedPowerUp, platformLayer);
    // this.physics.add.collider(this.tinnyPowerUp, platformLayer);
    // this.physics.add.collider(this.tinnyPowerUp, this.tinnyPowerUp);
    // this.physics.add.collider(this.tinnyPowerUp, this.bigPowerUp);
    // this.physics.add.collider(this.tinnyPowerUp, this.speedPowerUp);

    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.mCoins,
      this.collectMCoin,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.hydrogen,
      this.makeBondHydroxide,
      undefined,
      this
    );
    // this.physics.add.overlap(
    //   this.player,
    //   this.bigPowerUp,
    //   this.getPowerUp,
    //   undefined,
    //   this
    // );
    // this.physics.add.overlap(
    //   this.player,
    //   this.speedPowerUp,
    //   this.getPowerUpSpeed,
    //   undefined,
    //   this
    // );
    // this.physics.add.overlap(
    //   this.player,
    //   this.tinnyPowerUp,
    //   this.getPowerUpTinny,
    //   undefined,
    //   this
    // );

    this.player
      .setCollideWorldBounds(true)
      // .setBounce(0.2)
      // .setSize(TILE_SIZE * 1, TILE_SIZE * 1)
      .setScale(0.25)
      .setCircle(90)
      .setOffset(TILE_SIZE * 0.9, TILE_SIZE * 0.7);


    // this.player.play("run");
    this.player.setCollideWorldBounds(true);

    this.player.anims.create({
      key: "walk",
      frames: this.player.anims.generateFrameNames("atom guy", {
        start: 1,
        end: 2,
        prefix: "atom io s",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    // this.player.play("walk");
    this.player.anims.create({
      key: "idle",
      frames: this.player.anims.generateFrameNames("atom guy", {
        start: 1,
        end: 2,
        prefix: "atom idle ",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.hydrogen
    .setCollideWorldBounds(true)
    .setBounce(0.2)
    
    // .setSize(TILE_SIZE * 1, TILE_SIZE * 1)
    .setScale(0.25)
    .setCircle(90)
    .setX(10)
    .setY(10)
    .setOffset(TILE_SIZE * 0.9, TILE_SIZE * 0.7);

    this.hydrogen.setCollideWorldBounds(true);

    this.hydrogen.anims.create({
      key: "walk",
      frames: this.hydrogen.anims.generateFrameNames("hydrogen", {
        start: 1,
        end: 2,
        prefix: "hydrogen-walk ",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    // this.player.play("walk");
    this.hydrogen.anims.create({
      key: "idle",
      frames: this.hydrogen.anims.generateFrameNames("hydrogen", {
        start: 1,
        end: 2,
        prefix: "hydrogen-idle ",
        suffix: ".png",
      }),
      frameRate: 2,
      repeat: -1,
    });
    // this.player.play("idle");
    // this.player.anims.create({
    //   key: PLAYER_ANIMS.jump,
    //   frames: [{ key: "robot", frame: "character_robot_jump.png" }],
    // });
    // this.player.anims.create({
    //   key: PLAYER_ANIMS.fall,
    //   frames: [{ key: "robot", frame: "character_robot_fall.png" }],
    // });
    // this.player.play("idle");

    this.keyBinds = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      downArrow: Phaser.Input.Keyboard.KeyCodes.DOWN,
    });

    this.cameras.main.setBounds(0, 0, WIDTH, HEIGHT);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoom = 3;
  }

  update() {
 
    if (this.keyBinds.left.isDown || this.keyBinds.leftArrow.isDown) {
        this.player.setVelocityX(-200)} else 
        if (this.keyBinds.right.isDown || this.keyBinds.rightArrow.isDown) {
        this.player.setVelocityX(200); 
      }
    else {
      this.player.setVelocityX(0);
    }

  
    
 
    if (this.keyBinds.down.isDown || this.keyBinds.downArrow.isDown) {
      this.player.setVelocityY(200);
      this.jumpNoice.play();

    }
    else if (
      this.keyBinds.jump.isDown ||
      this.keyBinds.upArrow.isDown ||
      this.keyBinds.up.isDown
    ) {
      this.player.setVelocityY(-200);
      this.jumpNoice.play();      
    }
    else {
      this.player.setVelocityY(0);
    }
  
    

    


    // let x = this.player.body.velocity.x
    // let y = this.player.body.velocity.y


    let { x, y } = this.player.body.velocity;
    if(x < 0 || x > 0)
    { this.player.play(PLAYER_ANIMS.walk, true)} else 
      { this.player.play(PLAYER_ANIMS.idle, true)} 
    
    this.player.flipX = x < 0;
    if(x < 0 || x > 0)
    { this.player.play(PLAYER_ANIMS.walk, true)} else 
      { this.player.play(PLAYER_ANIMS.idle, true)} 
    
    this.player.flipX = x < 0;
  }
  

  checkElement(){
    if( this.nutron === 1){
      this.elment = 'Hydrogen'
    }else
    if( this.nutron === 2){
      this.elment = 'Helium'
    }else
    if( this.nutron === 3){
      this.elment = 'Lithium'
    }else
    if( this.nutron === 4){
      this.elment = 'Beryllium'
    }else
    if( this.nutron === 5){
      this.elment = 'Boron'
    }else
    if( this.nutron === 6){
      this.elment = 'Carbon'
    }else
    if( this.nutron === 7){
      this.elment = 'Nitrogen'
    }else
    if( this.nutron === 8){
      this.elment = 'Oxygen'
    }else
    if( this.nutron === 9){
      this.elment = 'Fluorine'
    }else
    if( this.nutron === 10){
      this.elment = 'Neon'
    }else
    if( this.nutron === 11){
      this.elment = 'Sodium'
    }else
    if( this.nutron === 12){
      this.elment = 'Magnesium'
    } else
    if( this.nutron === 13){
      this.elment = 'Aluminum'
    } else
    if( this.nutron === 14){
      this.elment = 'Silicon'
    } else
    if( this.nutron === 15){
      this.elment = 'Phosphorus'
    } else
    if( this.nutron === 16){
      this.elment = 'Sulfur'
    } else
    if( this.nutron === 17){
      this.elment = 'Chlorine'
    } else
    if( this.nutron === 18){
      this.elment = 'Argon'
    }else
    if( this.nutron === 19){
      this.elment = 'Potassium'
    }else
    if( this.nutron === 20){
      this.elment = 'Calcium'
    }else
    if( this.nutron === 21){
      this.elment = 'Scandium'
    }else
    if( this.nutron === 22){
      this.elment = 'Titanium'
    }else
    if( this.nutron === 23){
      this.elment = 'Vanadium'
    }else
    if( this.nutron === 24){
      this.elment = 'Chromium'
    }else
    if( this.nutron === 25){
      this.elment = 'Manganese'
    }else
    if( this.nutron === 26){
      this.elment = 'Iron'
    }else
    if( this.nutron === 27){
      this.elment = 'Cobalt'
    }else
    if( this.nutron === 28){
      this.elment = 'Nickel'
    }else
    if( this.nutron === 29){
      this.elment = 'Copper'
    }else
    if( this.nutron === 30){
      this.elment = 'Zinc'
    }else
    if( this.nutron === 31){
      this.elment = 'Gallium'
    }else
    if( this.nutron === 32){
      this.elment = 'Germanium'
    }else
    if( this.nutron === 33){
      this.elment = 'Arsenic'
    }else
    if( this.nutron === 34){
      this.elment = 'Selenium'
    }else
    if( this.nutron === 35){
      this.elment = 'Bromine'
    }
    if( this.nutron === 36){
      this.elment = 'Krypton'
    }
    if( this.nutron === 37){
      this.elment = 'Rubidium'
    }
    if( this.nutron === 38){
      this.elment = 'Strontium'
    }
    if( this.nutron === 39){
      this.elment = 'Yttrium'
    }
    if( this.nutron === 40){
      this.elment = 'Zirconium'
    }
    if( this.nutron === 41){
      this.elment = 'Niobium'
    }
    if( this.nutron === 42){
      this.elment = 'Molybdenum'
    }
    if( this.nutron === 43){
      this.elment = 'Technetium'
    }
    if( this.nutron === 44){
      this.elment = 'Rethenium'
    }
    if( this.nutron === 45){
      this.elment = 'Rhodium '
    }
    if( this.nutron === 46){
      this.elment = 'Palladium'
    }
    if( this.nutron === 47){
      this.elment = 'Silver'
    }
    if( this.nutron === 48){
      this.elment = 'Cadmium'
    }
    if( this.nutron === 49){
      this.elment = 'Indium'
    }
    if( this.nutron === 50){
      this.elment = 'Tin'
    }
    if( this.nutron === 51){
      this.elment = 'Antimony'
    }
    if( this.nutron === 52){
      this.elment = 'Tellurium'
    }
    if( this.nutron === 53){
      this.elment = 'Iodine'
    }
    if( this.nutron === 54){
      this.elment = 'Xenon'
    }
    if( this.nutron === 55){
      this.elment = 'Cesium'
    }
    if( this.nutron === 56){
      this.elment = 'Barium'
    }
    if( this.nutron === 57){
      this.elment = 'Lanthanum'
    }
    if( this.nutron === 58){
      this.elment = 'Cerium'
    }
    if( this.nutron === 59){
      this.elment = 'Praseodymium'
    }
    if( this.nutron === 60){
      this.elment = 'Neodymium'
    }
    if( this.nutron === 61){
      this.elment = 'Promethium'
    }
    if( this.nutron === 62){
      this.elment = 'Samarium'
    }
    if( this.nutron === 63){
      this.elment = 'Europium'
    }
    if( this.nutron === 64){
      this.elment = 'Gradolinium'
    }
    if( this.nutron === 65){
      this.elment = 'Terbium'
    }
    if( this.nutron === 66){
      this.elment = 'Dysprosium'
    }
    if( this.nutron === 67){
      this.elment = 'Holmium'
    }
    if( this.nutron === 68){
      this.elment = 'Erbium'
    }
    if( this.nutron === 69){
      this.elment = 'Thulium'
    }
    if( this.nutron === 70){
      this.elment = 'Ytterbium'
    }
    if( this.nutron === 71){
      this.elment = 'Luterium '
    }
    if( this.nutron === 72){
      this.elment = 'Hafnium'
    }
    if( this.nutron === 73){
      this.elment = 'Tantalum'
    }
    if( this.nutron === 74){
      this.elment = 'Tungsten'
    }
    if( this.nutron === 75){
      this.elment = 'Rhenium'
    }
    if( this.nutron === 76){
      this.elment = 'Osmium'
    }
    if( this.nutron === 77){
      this.elment = 'Indium'
    }
    if( this.nutron === 78){
      this.elment = 'Platinum'
    }
    if( this.nutron === 79){
      this.elment = 'Gold'
    }
    if( this.nutron === 80){
      this.elment = 'Mercury'
    }
    if( this.nutron === 81){
      this.elment = 'Thallium'
    }
    if( this.nutron === 82){
      this.elment = 'Lead'
    }
    if( this.nutron === 83){
      this.elment = 'Bismuth'
    }
    if( this.nutron === 84){
      this.elment = 'Polonium'
    }
    if( this.nutron === 85){
      this.elment = 'Astatine'
    }
    if( this.nutron === 86){
      this.elment = 'Radon'
    }
    if( this.nutron === 87){
      this.elment = 'Francium'
    }
    if( this.nutron === 88){
      this.elment = 'Radium'
    }
    if( this.nutron === 89){
      this.elment = 'Actinium'
    }
    if( this.nutron === 90){
      this.elment = 'Thorium'
    }
    if( this.nutron === 91){
      this.elment = 'Protactinium'
    }
    if( this.nutron === 92){
      this.elment = 'Uranium'
    }
    if( this.nutron === 93){
      this.elment = 'Neptunium'
    }
    if( this.nutron === 94){
      this.elment = 'Plutonium'
    }
    if( this.nutron === 95){
      this.elment = 'Americium'
    }
    if( this.nutron === 96){
      this.elment = 'Curium'
    }
    if( this.nutron === 97){
      this.elment = 'Berkelium'
    }
    if( this.nutron === 98){
      this.elment = 'Californium'
    }
    if( this.nutron === 99){
      this.elment = 'Einsteinium'
    }
    if( this.nutron === 100){
      this.elment = 'Fermium'
    }
    if( this.nutron === 101){
      this.elment = 'Mendelevium'
    }
    if( this.nutron === 102){
      this.elment = 'Nobelium'
    }
    if( this.nutron === 103){
      this.elment = 'Lawrencium '
    }
    if( this.nutron === 104){
      this.elment = 'Rutherfordium'
    }
    if( this.nutron === 105){
      this.elment = 'Dubnium'
    }
    if( this.nutron === 106){
      this.elment = 'Seaborgium'
    }
    if( this.nutron === 107){
      this.elment = 'Bohrium'
    }
    if( this.nutron === 108){
      this.elment = 'Hassium'
    }
    if( this.nutron === 109){
      this.elment = 'Meitnerium'
    }
    if( this.nutron === 110){
      this.elment = 'Darmstadtium'
    }
    if( this.nutron === 111){
      this.elment = 'Roentgenium'
    }
    if( this.nutron === 112){
      this.elment = 'Copernicium'
    }
    if( this.nutron === 113){
      this.elment = 'Nihonium'
    }
    if( this.nutron === 114){
      this.elment = 'Flerovium'
    }
    if( this.nutron === 115){
      this.elment = 'Moscovium'
    }
    if( this.nutron === 116){
      this.elment = 'Livermorium'
    }
    if( this.nutron === 117){
      this.elment = 'Tennessine'
    }
    if( this.nutron === 118){
      this.elment = 'Oganesson'
    }





  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.nutron++;
    if(this.nutron <= 0){
      this.nutron = 1
    }
    if(this.nutron > 118){
      this.nutron = 118
    }
    if(this.bond === 'Hydroxide' )
    {this.bond = 'none'}
    this.makeBondHydroxide
    this.checkElement();
    console.log(this.nutron, this.elment,this.bond, "collect");

    this.coinNoice.play();
  }
  collectMCoin(player, mCoin) {
    mCoin.disableBody(true, true);
    this.nutron--;
    if(this.nutron <= 0){
      this.nutron = 1
    }
    if(this.nutron > 118){
      this.nutron = 118
    }
    if(this.bond === 'Hydroxide' )
    {this.bond = 'none'}
    this.checkElement();
    console.log(this.nutron, this.elment, this.bond, "collect");

    this.coinNoice.play();
  }
  makeBondHydroxide(hydrogen, mCoin) {
    this.hydrogen.disableBody(true, true);
    if(this.elment === 'Oxygen'){
      this.bond = 'Hydroxide', this.hydrogen.disableBody(true, true)}
      else{ this.bond = 'none', this.hydrogen.disableBody(false, false)}

  

    console.log(this.nutron, this.elment, this.bond, "Bond made");

    this.coinNoice.play();
  }

//   getPowerUp(player, bigPowerUp) {
//     bigPowerUp.disableBody(true, true);
//     player.setScale(0.99);
//     console.log("Big");
//     this.speedPowerUp.colected = false;
//     this.powerUpNoice.play();
//   }
//   getPowerUpTinny(player, tinnyPowerUp) {
//     tinnyPowerUp.disableBody(true, true);
//     player.setScale(.01);
//     console.log("Tinny");
//     this.speedPowerUp.colected = false;
//     this.powerUpNoice.play();
//   }
//   getPowerUpSpeed(player, speedPowerUp) {
//     speedPowerUp.disableBody(true, true);
//     this.speedPowerUp.colected = true;

//     console.log("fast");
//     this.powerUpNoice.play();
//   }
}

/**@type {Phaser.Types.Core.GameConfig} */
const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
    },
  },
};

const game = new Phaser.Game(config);
