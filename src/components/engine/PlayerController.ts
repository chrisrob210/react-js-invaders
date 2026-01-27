import { Player } from "../gameobjects/Player";
import { Enemy } from "../gameobjects/Enemy";
import { KeyboardInput } from "../../controls/KeyboardInput";
import { Bullet } from "../gameobjects/Bullet";
import { isCollision } from "../logic/collision";
import { GameManager } from "./GameManager";


export class PlayerController {
    player: Player;
    bullets: Bullet[];

    constructor() {
        this.player = new Player();
        this.bullets = [];
    }

    update(delta: number, input: KeyboardInput, enemies: Enemy[]) {
        if (input.shoot) {
            const bullet = new Bullet();
            bullet.setLocation(this.player.getX(), this.player.getY(), this.player.getWidth())
            this.bullets.push(bullet);
        }

        // update player
        this.player.update(delta, input);

        // update bullet(s)
        this.bullets.forEach((bullet: Bullet) => { bullet.update(delta, input); });
        this.bullets = this.bullets.filter((bullet: Bullet) => !bullet.isOffScreen());

        // detect collisions
        //this.detectBulletCollision(enemies);
        this.detectCollisions(enemies);
    }

    detectCollisions(enemies: Enemy[]) {
        const enemiesToRemove: number[] = [];
        const bulletsToRemove: Set<number> = new Set();

        for (let enemyIndex = 0; enemyIndex < enemies.length; enemyIndex++) {
            const enemy = enemies[enemyIndex];
            if (!enemy) {
                console.error(`ERROR: Enemy at index ${enemyIndex} is undefined!`);
                continue;
            }
            if (enemiesToRemove.includes(enemyIndex)) continue;

            for (let bulletIndex = 0; bulletIndex < this.bullets.length; bulletIndex++) {
                const bullet = this.bullets[bulletIndex];
                if (!bullet) continue;
                if (bulletsToRemove.has(bulletIndex)) continue;

                if (isCollision(bullet, enemy)) {
                    GameManager.score += GameManager.pointsPerEnemy;
                    enemiesToRemove.push(enemyIndex);
                    bulletsToRemove.add(bulletIndex);
                    break; // This bullet hit an enemy, don't check it against more enemies
                }
            }
        }

        // Step 2: Remove bullets and enemies in reverse order
        const sortedBullets = Array.from(bulletsToRemove).sort((a, b) => b - a);
        sortedBullets.forEach((index: number) => {
            if (index >= 0 && index < this.bullets.length) {
                this.bullets.splice(index, 1);
            } else {
                console.error(`ERROR: Invalid bullet index ${index}, array length: ${this.bullets.length}`);
            }
        });

        const sortedEnemies = enemiesToRemove.sort((a, b) => b - a);
        sortedEnemies.forEach((index: number) => {
            if (index >= 0 && index < enemies.length) {
                enemies.splice(index, 1);
            } else {
                console.error(`ERROR: Invalid enemy index ${index}, array length: ${enemies.length}`);
            }
        });

        // Step 3: Check player-enemy collisions (AFTER removal)
        if (enemies.length === 0) {
            return;
        }

        // Use traditional for loop for better control and safety
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];

            // Safety checks
            if (!enemy) {
                console.error(`ERROR: Enemy at index ${i} is undefined! Array length: ${enemies.length}`);
                continue;
            }

            if (i >= enemies.length) {
                console.error(`ERROR: Index ${i} >= array length ${enemies.length}`);
                break; // Should never happen, but break if it does
            }

            if (isCollision(this.player, enemy)) {
                GameManager.lives -= 1;
                this.player.setX(375);
                this.player.setY(520);
                this.bullets = [];

                if (GameManager.lives <= 0) {
                    GameManager.gameOver = true;
                    console.log("GAME OVER");
                }
                break; // Only process first collision
            }
        }
    }

    // detectBulletCollision(enemies: Enemy[]) {
    //     return enemies.filter((enemy: Enemy) => {
    //         this.bullets.forEach((bullet: Bullet) => {
    //             if (hasCollided(bullet, enemy)) {
    //                 GameManager.score += 5;
    //                 return false;
    //             }
    //             return true;
    //         });
    //     });
    // }

    draw(ctx: CanvasRenderingContext2D) {
        this.player.draw(ctx);
        this.bullets.forEach((bullet: Bullet) => { bullet.draw(ctx); });
    }

    getPlayer() {
        return this.player;
    }
}