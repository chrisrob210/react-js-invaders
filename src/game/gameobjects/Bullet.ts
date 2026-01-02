import { GameObject } from "./GameObject";
import { Input } from "../Input";

export class Bullet extends GameObject {
    x = 0;
    y = 0;
    width = 5;
    height = 5;
    color: string = "yellow";
    speed: number = 0.5;
    coolDown: number = 0;
    delay: number = 300;

    setLocation(playerX: number, playerY: number, playerWidth: number): void {
        this.x = playerX + playerWidth / 2;
        this.y = playerY;
    }

    update(delta: number, input: Input): void {
        if (this.coolDown > 0) this.coolDown -= delta;
        if (input.shoot && this.coolDown <= 0) {
            // this.state.bullets.push({
            //     x: this.state.player.x + this.state.player.width / 2 - 2.5, // center
            //     y: this.state.player.y,
            //     width: 5,
            //     height: 10,
            //     speed: 0.5, // pixels per ms
            // });
            this.coolDown = this.delay; // reset cooldown
            input.shoot = false; // one shot per keypress
        }
        this.y -= this.speed * delta;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    isOffScreen() {
        return !(this.y + this.height > 0);
    }
}