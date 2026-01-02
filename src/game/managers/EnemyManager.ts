import { GameManager } from "./GameManager";
import { Input } from "../Input";
import { Enemy } from "../gameobjects/Enemy";

export class EnemyManager {
    direction: 1 | -1 = 1;
    enemies: Enemy[];
    private gridCreated: boolean = false;

    constructor() {
        this.enemies = [];
    }

    update(delta: number, input: Input) {
        input;
        let shouldReverse = false;
        this.enemies.forEach((enemy: Enemy) => {
            // check for edge collision
            if (enemy.getX() <= 0 || enemy.getX() + enemy.getWidth() >= GameManager.screenWidth) {
                shouldReverse = true;
            }
        });

        if (shouldReverse) {
            this.direction *= -1; // reverse direction
            this.enemies.forEach((enemy: Enemy) => {
                enemy.setY(enemy.getY() + 20);  // move down when changing direction
            });
        }

        this.enemies.forEach((enemy: Enemy) => {
            enemy.setX(enemy.getX() + this.direction * enemy.speed * delta);
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.enemies.forEach((enemy: Enemy) => {
            enemy.draw(ctx);
        })
    }

    createEnemyGrid(rows: number = 6, cols: number = 6) {
        if (this.gridCreated) {
            return;
        }
        this.enemies = [];
        const spacingX = 60;
        const spacingY = 50;
        const startX = 100;
        const startY = 50;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // enemies.push({
                //     color: "green",
                //     x: startX + col * spacingX,
                //     y: startY + row * spacingY,
                //     width: 30,
                //     height: 30,
                // });
                const enemy = new Enemy();
                enemy.setX(startX + col * spacingX);
                enemy.setY(startY + row * spacingY);
                this.enemies.push(enemy);
            }
        }
        this.gridCreated = true;
    }
}