import { GameManager } from "../engine/GameManager";
import { GameObject } from "./GameObject";
import { KeyboardInput } from "../../controls/KeyboardInput";


export class Enemy extends GameObject {
    x = 0;
    y = 0;
    width = 32;
    height = 32;
    color: string = "green";
    speed: number = 0.15;
    image: HTMLImageElement;

    constructor(x: number, y: number, image: HTMLImageElement) {
        super();
        this.x = x;
        this.y = y;
        // this.width = width;
        // this.height = height;
        this.image = image;
    }

    setColor(color: string) {
        this.color = color;
    }

    setSpeed(speed: number) {
        this.speed = speed;
    }

    update(delta: number, input: KeyboardInput) {
        input;
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
        // ctx.fillStyle = this.color;
        // ctx.fillRect(
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        // );
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}