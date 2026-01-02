import { GameObject } from "./GameObject";
import { Input } from "../Input";

export class Label extends GameObject {
    font: string = "";
    text: string = "";

    constructor(font?: string, text?: string, positionX?: number, positionY?: number) {
        super();
        if (font) this.font = font;
        if (text) this.text = text;
        if (positionX) this.x = positionX;
        if (positionY) this.y = positionY;
    }

    getFont() {
        return this.font;
    }

    setFont(font: string) {
        this.font = font;
    }

    getText() {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
    }

    update(delta: number, input: Input) {
        delta;
        input;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color!;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y);
    }
}