export class Input {
    left = false;
    right = false;
    up = false;
    down = false;
    shoot = false;
    pause = false;

    onKeyDown(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") this.left = true;
        if (e.key === "ArrowRight") this.right = true;
        if (e.key === "ArrowUp") this.up = true;
        if (e.key === "ArrowDown") this.down = true;
        if (e.key === " " || e.key === "Spacebar") this.shoot = true;
        if (e.key === "Escape" && !this.pause) this.pause = true;
    }

    onKeyUp(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") this.left = false;
        if (e.key === "ArrowRight") this.right = false;
        if (e.key === "ArrowUp") this.up = false;
        if (e.key === "ArrowDown") this.down = false;
        if (e.key === " " || e.key === "Spacebar") this.shoot = false;
        if (e.key === "Escape") this.pause = false;
    }
}
