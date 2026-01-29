import { GameObject } from "./GameObject";
import { KeyboardInput } from "../../controls/KeyboardInput";
import { GameManager } from "../engine/GameManager";
import { CanvasContext } from "../engine/CanvasContext";

export class Player extends GameObject {
    x = 375;
    y = 520;
    width = 64;
    height = 64;
    color: string = "white";
    speed: number = 0.15;
    image: HTMLImageElement;
    imageSrc: string = "/src/assets/player.png";

    constructor() {
        super()
        this.image = new Image();
        this.image.src = this.imageSrc;
    }

    setImage(image: HTMLImageElement) {
        this.image = image;
    }

    setImageSrc(imageSrc: string) {
        this.image.src = imageSrc;
    }

    update(delta: number, input: KeyboardInput) {
        const speedDelta = this.speed * delta;
        if (input.left) this.x -= speedDelta;
        if (input.right) this.x += speedDelta;
        this.x = Math.max(0, Math.min(GameManager.screenWidth - this.width, this.x));

        // TODO: Put Bullet object here
        // ? This might be the best place for it (maybe?)
    }

    draw() {
        const ctx = CanvasContext.getInstance().getContext();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}