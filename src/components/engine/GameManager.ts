import { PlayerManager } from "./PlayerManager";
import { EnemyManager } from "./EnemyManager";
import { UIManager } from "./UIManager";
import { KeyboardInput } from "../../controls/KeyboardInput";
import { GameObject } from "../gameobjects/GameObject";
// import { Label } from "../ui/Label";

export class GameManager {
    // state: GameState;

    // TODO: Nothing should be in this file except the basics required to function

    static screenWidth: number = 800;
    static screenHeight: number = 600;

    gameObjects: GameObject[] = [];
    playerManager: PlayerManager;
    enemyManager: EnemyManager;
    uiManager: UIManager;

    // player values
    playerSpeed: number = 0.15;
    shootCooldown: number = 0;
    shootDelay: number = 300;

    // game values
    static lives: number = 3;
    static score: number = 0;
    static currentWave: number = 1;
    static gameOver: boolean = false;
    static pause: boolean = false;
    static pointsPerEnemy: number = 5;
    static pointsPerUfo: number = 100;

    // labelLives: Label;
    // labelScore: Label;
    // labelCurrentWave: Label;
    // labelGameOver: Label;

    // enemy values
    totalEnemies: number = 0;
    remainingEnemies: number = 0;
    enemyDirection: 1 | -1 = 1; // 1 = right, -1 = left
    enemySpeed: number = 0.1;
    baseEnemySpeed: number = 0.02;
    maxEnemySpeed: number = 0.5


    constructor(canvasWidth: number = 800, canvasHeight: number = 600) {
        GameManager.screenWidth = canvasWidth;
        GameManager.screenHeight = canvasHeight;

        this.enemyDirection = 1;
        this.enemySpeed = 0.1;

        this.playerManager = new PlayerManager();
        this.enemyManager = new EnemyManager();
        this.enemyManager.createEnemyGrid();
        this.uiManager = new UIManager();

        // Labels (test)
        // this.labelLives = new Label("20px Arial", "Lives: ", 700, 20, "white");
        // this.labelScore = new Label("20px Arial", "Score: ", 10, 20, "white");
        // this.labelCurrentWave = new Label("20px Arial", "Wave: ", 350, 20, "white");
        // this.labelGameOver = new Label("50px Arial", "GAME OVER", 700, 20, "red");
    }

    update(delta: number, input: KeyboardInput) {
        if (GameManager.gameOver) return;

        if (input.pause === true) {
            GameManager.pause = !GameManager.pause;
            input.pause = false;
        }

        if (GameManager.pause === true) return;

        // Update GameObjects
        this.playerManager.update(delta, input, this.enemyManager.enemies);
        this.enemyManager.update(delta, input);
        this.uiManager.update(delta, input);
        //     this.labelLives.setText("Lives: " + GameManager.lives);
        //     this.labelScore.setText("Score: " + GameManager.score);
        //     this.labelCurrentWave.setText("Wave: " + GameManager.currentWave);
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Clear the canvas first!
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, GameManager.screenWidth, GameManager.screenHeight);

        // Draw GameObjects
        this.playerManager.draw(ctx);
        this.enemyManager.draw(ctx);
        this.uiManager.draw(ctx);

    }


    // createEnemyGrid(rows: number, cols: number) {
    //     const enemies: EnemyState[] = [];
    //     const spacingX = 60;
    //     const spacingY = 50;
    //     const startX = 100;
    //     const startY = 50;

    //     for (let row = 0; row < rows; row++) {
    //         for (let col = 0; col < cols; col++) {
    //             enemies.push({
    //                 color: "green",
    //                 x: startX + col * spacingX,
    //                 y: startY + row * spacingY,
    //                 width: 30,
    //                 height: 30,
    //             });
    //         }
    //     }

    //     return enemies;
    // }

    // createNewWave() {
    //     // increment wave
    //     GameManager.currentWave += 1;

    //     // optionally increase difficulty
    //     const newRows = 3 + Math.floor(GameManager.currentWave / 2); // more rows every 2 waves
    //     const newCols = 5 + Math.floor(GameManager.currentWave / 3); // more columns every 3 waves

    //     // cap max columns
    //     const maxCols = 10;
    //     const cols = Math.min(newCols, maxCols);

    //     // reset enemies
    //     this.state.enemies = this.createEnemyGrid(newRows, cols);

    //     // optionally increase base speed
    //     this.baseEnemySpeed += 0.005;
    //     this.maxEnemySpeed += 0.05;

    //     console.log("Wave", GameManager.currentWave);
    // }
}
