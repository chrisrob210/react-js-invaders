export interface Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
}

export interface Enemy {
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface GameState {
    // playerX: number;
    player: {
        x: number;
        y: number;
        width: number;
        height: number;
    },
    enemies: Enemy[];
    bullets: Bullet[];
    lives: number;
    gameOver: boolean;
    score: number;
}

