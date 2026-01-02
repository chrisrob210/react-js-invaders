import { GameObject } from "./GameObject";
import { Input } from "../Input";
import { GameManager } from "../managers/GameManager";

export class Player extends GameObject {
    x = 375;
    y = 520;
    width = 50;
    height = 20;
    color: string = "white";
    speed: number = 0.15;

    update(delta: number, input: Input) {
        const speedDelta = this.speed * delta;
        if (input.left) this.x -= speedDelta;
        if (input.right) this.x += speedDelta;
        this.x = Math.max(0, Math.min(GameManager.screenWidth - this.width, this.x));
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "white";
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}