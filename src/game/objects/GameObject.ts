import { Input } from "../Input";

export abstract class GameObject {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    constructor() { }

    // Setter methods - available to all child classes
    setX(x: number): void {
        this.x = x;
    }

    setY(y: number): void {
        this.y = y;
    }

    setWidth(width: number): void {
        this.width = width;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    // Convenience method to set position
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    abstract update(delta: number, input?: Input): void;

    abstract draw(ctx: CanvasRenderingContext2D): void;
}