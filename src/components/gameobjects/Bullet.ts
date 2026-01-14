import { GameObject } from "./GameObject";
import { KeyboardInput } from "../../controls/KeyboardInput";

export class Bullet extends GameObject {
    x = 0;
    y = 0;
    width = 6;
    height = 6;
    color: string = "yellow";
    speed: number = 0.5;
    coolDown: number = 0;
    delay: number = 300;
    image: HTMLImageElement;
    imgSrc: string = "/src/assets/bullet.png";
    constructor() {
        super();
        this.image = new Image();
        this.image.src = this.imgSrc;
    }

    setLocation(playerX: number, playerY: number, playerWidth: number): void {
        this.x = playerX + playerWidth / 2;
        this.y = playerY;
    }

    update(delta: number, input: KeyboardInput): void {
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
        // ctx.fillStyle = this.color;
        // ctx.fillRect(
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        // );
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOffScreen() {
        return !(this.y + this.height > 0);
    }
}