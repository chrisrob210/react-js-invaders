import { GameManager } from "../managers/GameManager";
import { GameObject } from "./GameObject";
import { Input } from "../Input";

export class Enemy extends GameObject {
    x = 0;
    y = 0;
    width = 30;
    height = 30;
    color: string = "green";
    speed: number = 0.15;

    setColor(color: string) {
        this.color = color;
    }

    setSpeed(speed: number) {
        this.speed = speed;
    }

    update(delta: number, input: Input) {
        // let shouldReverse = false;

        this.x += this.speed * delta;
        this.x = Math.max(0, Math.min(GameManager.screenWidth - this.width, this.x));
        // TODO: move this to EnemyManager
        // check for edge collision
        // if (this.x <= 0 || this.x + this.width >= GameManager.screenWidth) {
        //     shouldReverse = true;
        // }

        // if (shouldReverse) {
        //     this.enemyDirection *= -1; // reverse direction
        //     this.state.enemies.forEach((enemy) => {
        //         enemy.y += 20; // move down when changing direction
        //     });
        // }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}