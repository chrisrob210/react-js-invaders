import type { Enemy, GameState } from "./GameState";
// import type { Rect } from "./collision";
import { Input } from "./Input";
import { rectsIntersect } from "./collision";

export class Game {
    state: GameState;

    screenWidth: number = 800;
    screenHeight: number = 600;

    totalEnemies: number = 0;
    remainingEnemies: number = 0;
    enemyDirection: 1 | -1 = 1; // 1 = right, -1 = left
    enemySpeed: number = 0.1;
    baseEnemySpeed: number = 0.1;
    maxEnemySpeed: number = 0.5
    shootCooldown: number = 0;
    shootDelay: number = 300;
    pointsPerEnemy: number = 100;
    currentWave: number = 1;

    constructor(canvasWidth: number = 800, canvasHeight: number = 600) {
        this.screenWidth = canvasWidth;
        this.screenHeight = canvasHeight;

        this.state = {
            player: {
                x: 375,
                y: 520,
                width: 50,
                height: 20,
            },
            enemies: [],
            bullets: [],
            lives: 3,
            gameOver: false,
            score: 0,
        };
        this.enemyDirection = 1;
        this.enemySpeed = 0.1;
        this.state.enemies = this.createEnemyGrid(3, 5); // 3 rows, 5 columns
        this.totalEnemies = this.state.enemies.length;
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
        if (this.state.gameOver) return;
        const speed = 0.4 * delta;

        // --- player movement ---
        if (input.left) this.state.player.x -= speed;
        if (input.right) this.state.player.x += speed;
        this.state.player.x = Math.max(0, Math.min(this.screenWidth - this.state.player.width, this.state.player.x));

        // --- enemy movement ---
        let shouldReverse = false;

        this.state.enemies.forEach((enemy: Enemy) => {
            enemy.x += this.enemyDirection * this.enemySpeed * delta;

            // check for edge collision
            if (enemy.x <= 0 || enemy.x + enemy.width >= this.screenWidth) {
                shouldReverse = true;
            }
        });

        if (shouldReverse) {
            this.enemyDirection *= -1; // reverse direction
            this.state.enemies.forEach((enemy) => {
                enemy.y += 20; // move down when changing direction
            });
        }

        // player - enemy collision
        this.state.enemies.forEach((enemy) => {
            if (rectsIntersect(this.state.player, enemy)) {
                this.state.lives -= 1;         // lose a life
                console.log("PLAYER HIT! Lives:", this.state.lives);

                // reset player position
                this.state.player.x = 375;
                this.state.player.y = 520;

                // optional: reset bullets
                this.state.bullets = [];

                // check for game over
                if (this.state.lives <= 0) {
                    this.state.gameOver = true;
                    console.log("GAME OVER");
                }
            }
        });

        // --- bullets ---
        if (this.shootCooldown > 0) this.shootCooldown -= delta;
        if (input.shoot && this.shootCooldown <= 0) {
            this.state.bullets.push({
                x: this.state.player.x + this.state.player.width / 2 - 2.5, // center
                y: this.state.player.y,
                width: 5,
                height: 10,
                speed: 0.5, // pixels per ms
            });

            this.shootCooldown = this.shootDelay; // reset cooldown
            input.shoot = false; // one shot per keypress
        }

        // move bullets
        this.state.bullets.forEach((bullet) => {
            bullet.y -= bullet.speed * delta;
        });

        // remove offscreen bullets
        this.state.bullets = this.state.bullets.filter((b) => b.y + b.height > 0);

        // --- collision with enemies ---
        this.state.enemies = this.state.enemies.filter((enemy) => {
            const hit = this.state.bullets.some((bullet) =>
                rectsIntersect(bullet, enemy)
            );
            if (hit) {
                // remove bullets that hit this enemy
                this.state.bullets = this.state.bullets.filter(
                    (bullet) => !rectsIntersect(bullet, enemy)
                );
                this.state.score += this.pointsPerEnemy;
            }
            return !hit; // remove enemy if hit
        });

        // Increase speed as enemies are cleared
        this.remainingEnemies = this.state.enemies.length;
        this.enemySpeed =
            this.baseEnemySpeed +
            ((this.totalEnemies - this.remainingEnemies) / this.totalEnemies) * (this.maxEnemySpeed - this.baseEnemySpeed);


        if (this.state.enemies.length === 0 && !this.state.gameOver) {
            this.createNewWave();
        }

    }

    draw(ctx: CanvasRenderingContext2D) {

        // player
        ctx.fillStyle = "white";
        ctx.fillRect(
            this.state.player.x,
            this.state.player.y,
            this.state.player.width,
            this.state.player.height
        );

        // enemies
        this.state.enemies.forEach((enemy) => {
            ctx.fillStyle = enemy.color;
            ctx.fillRect(
                enemy.x,
                enemy.y,
                enemy.width,
                enemy.height
            );
        })


        // bullets
        ctx.fillStyle = "yellow";
        this.state.bullets.forEach((b) => {
            ctx.fillRect(b.x, b.y, b.width, b.height);
        });


        // --- Lives ---
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Lives: " + this.state.lives, 700, 20);


        // --- Score ---
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + this.state.score, 10, 20); // top-right

        // --- Waves ---
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Wave: " + this.currentWave, 350, 20);


        // --- Game Over ---
        if (this.state.gameOver) {
            ctx.fillStyle = "red";
            ctx.font = "50px Arial";
            ctx.fillText("GAME OVER", 200, 300);
        }
    }


    createEnemyGrid(rows: number, cols: number) {
        const enemies: Enemy[] = [];
        const spacingX = 80;
        const spacingY = 60;
        const startX = 100;
        const startY = 50;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                enemies.push({
                    color: "green",
                    x: startX + col * spacingX,
                    y: startY + row * spacingY,
                    width: 60,
                    height: 30,
                });
            }
        }

        return enemies;
    }

    createNewWave() {
        // increment wave
        this.currentWave += 1;

        // optionally increase difficulty
        const newRows = 3 + Math.floor(this.currentWave / 2); // more rows every 2 waves
        const newCols = 5 + Math.floor(this.currentWave / 3); // more columns every 3 waves

        // cap max columns
        const maxCols = 10;
        const cols = Math.min(newCols, maxCols);

        // reset enemies
        this.state.enemies = this.createEnemyGrid(newRows, cols);

        // optionally increase base speed
        this.baseEnemySpeed += 0.02;
        this.maxEnemySpeed += 0.05;

        console.log("Wave", this.currentWave);
    }
}
