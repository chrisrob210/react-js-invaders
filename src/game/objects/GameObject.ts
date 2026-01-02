import { Input } from "../Input";

export abstract class GameObject {
    abstract x: number;
    abstract y: number;
    abstract width: number;
    abstract height: number;

    constructor() { }

    abstract update(delta: number, input?: Input): void;

    abstract draw(ctx: CanvasRenderingContext2D): void;
}