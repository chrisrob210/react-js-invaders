import { KeyboardInput } from "../../controls/KeyboardInput";

export abstract class GameObject {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    color?: string;

    constructor() { }

    getX(): number {
        return this.x;
    }

    setX(x: number): void {
        this.x = x;
    }

    getY(): number {
        return this.y;
    }

    setY(y: number): void {
        this.y = y;
    }

    getWidth(): number {
        return this.width;
    }

    setWidth(width: number): void {
        this.width = width;
    }

    getHeight(): number {
        return this.height;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    // Convenience method to set position
    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    getColor() {
        return this.color;
    }

    setColor(color: string) {
        this.color = color;
    }



    abstract update(delta: number, input?: KeyboardInput): void;

    abstract draw(): void;
}