import { KeyboardInput } from "../../controls/KeyboardInput";
import { CanvasContext } from "../engine/CanvasContext";
export class Background {
    x: number;
    y: number;
    height: number;
    width: number;
    color: string;

    constructor(positionX: number, positionY: number, width: number, height: number, color: string) {
        this.x = positionX;
        this.y = positionY;
        this.height = height;
        this.width = width;
        this.color = color;
    }

    update(delta: number, input: KeyboardInput) {
        delta;
        input;
    }

    draw() {
        const ctx = CanvasContext.getInstance().getContext();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}