import { GameObject } from "./GameObject";
import { KeyboardInput } from "../../controls/KeyboardInput";
import { CanvasContext } from "../engine/CanvasContext";

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
    imageSrc: string = "/src/assets/bullet.png";
    constructor() {
        super();
        this.image = new Image();
        this.image.src = this.imageSrc;
    }

    setImage(image: HTMLImageElement) {
        this.image = image;
    }

    setImageSrc(imageSrc: string) {
        this.image.src = imageSrc;
    }

    setLocation(playerX: number, playerY: number, playerWidth: number): void {
        this.x = playerX + playerWidth / 2;
        this.y = playerY;
    }

    update(delta: number, input: KeyboardInput): void {
        if (this.coolDown > 0) this.coolDown -= delta;
        if (input.shoot && this.coolDown <= 0) {
            this.coolDown = this.delay; // reset cooldown
            input.shoot = false; // one shot per keypress
        }
        this.y -= this.speed * delta;
    }

    draw(): void {
        const ctx = CanvasContext.getInstance().getContext();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isOffScreen() {
        return !(this.y + this.height > 0);
    }
}