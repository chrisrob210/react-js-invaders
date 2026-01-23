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
}
