import { GameObject } from "./gameobjects/GameObject";

export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function isCollision(gameObjectA: GameObject, gameObjectB: GameObject): boolean {
    return (
        gameObjectA.x < gameObjectB.x + gameObjectB.width &&
        gameObjectA.x + gameObjectA.width > gameObjectB.x &&
        gameObjectA.y < gameObjectB.y + gameObjectB.height &&
        gameObjectA.y + gameObjectA.height > gameObjectB.y
    );
}
