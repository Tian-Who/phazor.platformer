import './style.css'
import Phaser from 'phaser'

const PLAYER_ANIMS = {
  idle: "idle",
  walk: "walk",
  run: "run"
}

class MainScene extends Phaser.Scene {
  constructor() {
    super("main-scene");

  }

  preload() {
    this.load.atlas("robot", "robot.png", "robot.json"); 

  }
  
  create() {
    const { height, width } = this.scale;

    let player = this.physics.add.sprite(width / 2, height / 2, "robot")
    player.setCollideWorldBounds(true);

    player.anims.create ({
      key: "run",
      frames: player.anims.generateFrameNames("robot", {
        start: 0,
        end: 2,
        prefix: "character_robot_run",
        suffix: ".png"
      }),
      frameRate: 10, 
      repeat: -1,

     });
     player.play(run);
     player.setCollideWorldBounds(true);
     
     player.setBounce(10)
  player.anims.create ({
    key: "walk",
    frames: player.anims.generateFrameNames("robot", {
      start: 0,
      end: 8,
      prefix: "character_robot_walk",
      suffix: ".png"
    }),
    frameRate: 10, 
    repeat: -1,

   });
   player.play(walk);

   player.anims.create ({
    key: "idle",
    frames: player.anims.generateFrameNames("robot", {
  
      prefix: "character_robot_idle",
      suffix: ".png"
    }),


   });
   player.play(idle)
  };


  

  update() {}

}

/**@type {Phaser.Types.Core.GameConfig} */
const config = {
  type: Phaser.WEBGL,
  width: 400,
  height: 400,
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
     gravity: {y: 300},

    }


  }
};

const game = new Phaser.Game(config);