import { PlayerManager } from "./PlayerManager";
import { EnemyManager } from "./EnemyManager";
import { Input } from "../Input";
import { GameObject } from "../gameobjects/GameObject";
import { Label } from "../gameobjects/Label";

export class GameManager {
    // state: GameState;

    static screenWidth: number = 800;
    static screenHeight: number = 600;

    gameObjects: GameObject[] = [];
    playerManager: PlayerManager;
    enemyManager: EnemyManager;



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

    labelLives = new Label();

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

        // this.state = {
        //     player: {
        //         x: 375,
        //         y: 520,
        //         width: 50,
        //         height: 20,
        //     },
        //     enemies: [],
        //     bullets: [],
        //     lives: 3,
        //     gameOver: false,
        //     score: 0,
        // };
        this.enemyDirection = 1;
        this.enemySpeed = 0.1;
        // this.state.enemies = this.createEnemyGrid(6, 6); // 3 rows, 5 columns
        // this.totalEnemies = this.state.enemies.length;

        this.playerManager = new PlayerManager();
        this.enemyManager = new EnemyManager();
        this.enemyManager.createEnemyGrid();

        // test
        // this.gameObjects.push(new Player());
        // TODO: move this to EnemyManager
        // this.gameObjects.push(new Enemy());

        // generate enemies
        // const rows = 3;
        // const cols = 5;
        // const spacingX = 80;
        // const spacingY = 60;
        // const startX = 100;
        // const startY = 50;

        // for (let row = 0; row < rows; row++) {
        //     for (let col = 0; col < cols; col++) {
        //         this.state.enemies.push({
        //             color: "green",
        //             x: startX + col * spacingX,
        //             y: startY + row * spacingY,
        //             width: 60,
        //             height: 30,
        //         });
        //     }
        // }

    }

    update(delta: number, input: Input) {
        if (GameManager.gameOver) return;

        if (input.pause === true) {
            GameManager.pause = !GameManager.pause;
            input.pause = false;
        }

        if (GameManager.pause === true) return;

        // const speed = this.playerSpeed * delta;
        // this.gameObjects.forEach((gameObject) => {
        //     gameObject.update(delta, input);
        // })
        this.playerManager.update(delta, input, this.enemyManager.enemies);
        this.enemyManager.update(delta, input);
        // --- player movement ---
        // if (input.left) this.state.player.x -= speed;
        // if (input.right) this.state.player.x += speed;
        // this.state.player.x = Math.max(0, Math.min(GameManager.screenWidth - this.state.player.width, this.state.player.x));


        // --- enemy movement ---
        // let shouldReverse = false;

        // this.state.enemies.forEach((enemy: EnemyState) => {
        //     enemy.x += this.enemyDirection * this.enemySpeed * delta;

        //     // check for edge collision
        //     if (enemy.x <= 0 || enemy.x + enemy.width >= GameManager.screenWidth) {
        //         shouldReverse = true;
        //     }
        // });

        // if (shouldReverse) {
        //     this.enemyDirection *= -1; // reverse direction
        //     this.state.enemies.forEach((enemy) => {
        //         enemy.y += 20; // move down when changing direction
        //     });
        // }

        // TODO: player - enemy collision
        // this.state.enemies.forEach((enemy) => {
        //     if (hasCollided(this.state.player, enemy)) {
        //         this.state.lives -= 1;         // lose a life
        //         console.log("PLAYER HIT! Lives:", this.state.lives);

        //         // reset player position
        //         this.state.player.x = 375;
        //         this.state.player.y = 520;

        //         // optional: reset bullets
        //         this.state.bullets = [];

        //         // check for game over
        //         if (this.state.lives <= 0) {
        //             this.state.gameOver = true;
        //             console.log("GAME OVER");
        //         }
        //     }
        // });

        // --- bullets ---
        // if (this.shootCooldown > 0) this.shootCooldown -= delta;
        // if (input.shoot && this.shootCooldown <= 0) {
        //     this.state.bullets.push({
        //         x: this.state.player.x + this.state.player.width / 2 - 2.5, // center
        //         y: this.state.player.y,
        //         width: 5,
        //         height: 10,
        //         speed: 0.5, // pixels per ms
        //     });

        //     this.shootCooldown = this.shootDelay; // reset cooldown
        //     input.shoot = false; // one shot per keypress
        // }

        // move bullets
        // this.state.bullets.forEach((bullet) => {
        //     bullet.y -= bullet.speed * delta;
        // });

        // remove offscreen bullets
        // this.state.bullets = this.state.bullets.filter((b) => b.y + b.height > 0);

        // --- collision with enemies ---
        // this.state.enemies = this.state.enemies.filter((enemy) => {
        //     const hit = this.state.bullets.some((bullet) =>
        //         hasCollided(bullet, enemy)
        //     );
        //     if (hit) {
        //         // remove bullets that hit this enemy
        //         this.state.bullets = this.state.bullets.filter(
        //             (bullet) => !hasCollided(bullet, enemy)
        //         );
        //         this.state.score += GameManager.pointsPerEnemy;
        //     }
        //     return !hit; // remove enemy if hit
        // });

        // Increase speed as enemies are cleared
        // this.remainingEnemies = this.state.enemies.length;
        // this.enemySpeed =
        //     this.baseEnemySpeed +
        //     ((this.totalEnemies - this.remainingEnemies) / this.totalEnemies) * (this.maxEnemySpeed - this.baseEnemySpeed);


        // if (this.state.enemies.length === 0 && !this.state.gameOver) {
        //     this.createNewWave();
        // }

    }

    draw(ctx: CanvasRenderingContext2D) {
        // Clear the canvas first!
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, GameManager.screenWidth, GameManager.screenHeight);

        this.playerManager.draw(ctx);
        this.enemyManager.draw(ctx);


        // bullets
        // ctx.fillStyle = "yellow";
        // this.state.bullets.forEach((b) => {
        //     ctx.fillRect(b.x, b.y, b.width, b.height);
        // });


        // --- Lives ---
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Lives: " + GameManager.lives, 700, 20);


        // --- Score ---
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + GameManager.score, 10, 20); // top-right

        // --- Waves ---
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Wave: " + GameManager.currentWave, 350, 20);


        // --- Game Over ---
        if (GameManager.gameOver) {
            ctx.fillStyle = "red";
            ctx.font = "50px Arial";
            ctx.fillText("GAME OVER", 200, 300);
        }
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
