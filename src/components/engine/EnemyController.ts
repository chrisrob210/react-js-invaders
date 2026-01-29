import { GameManager } from "./GameManager";
import { KeyboardInput } from "../../controls/KeyboardInput";
import { Enemy } from "../gameobjects/Enemy";

export class EnemyController {
    direction: 1 | -1 = 1;
    enemies: Enemy[];
    private gridCreated: boolean = false;
    imageSources = [
        '/src/assets/space_crab.png',
        '/src/assets/space_squid.png'
    ];
    constructor() {
        this.enemies = [];
    }

    // Random number generator that returns 0 or 1
    private getRandomImageIndex(): 0 | 1 {
        return Math.floor(Math.random() * 2) as 0 | 1;
    }

    update(delta: number, input: KeyboardInput) {
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

    draw() {
        this.enemies.forEach((enemy: Enemy) => {
            enemy.draw();
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
        const image = new Image();
        image.src = "/src/assets/space_crab.png";

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Generate random 0 or 1 to select image source
                const randomIndex = this.getRandomImageIndex();
                const imageSource = this.imageSources[randomIndex];

                // Create new Image() for each enemy
                const image = new Image();
                image.src = imageSource;


                const enemy = new Enemy(startX + col * spacingX, startY + row * spacingY, image);
                enemy.setX(startX + col * spacingX);
                enemy.setY(startY + row * spacingY);
                this.enemies.push(enemy);
            }
        }
        this.gridCreated = true;
    }
}