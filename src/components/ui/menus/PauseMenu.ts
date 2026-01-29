import { KeyboardInput } from "../../../controls/KeyboardInput";
import { Label } from "../Label";
import { Background } from "../Background";

export class PauseMenu {
    labelPause: Label;
    background: Background;

    constructor() {
        this.labelPause = new Label("50px Arial", "Paused", 300, 100, "white");
        this.background = new Background(100, 20, 600, 100, "red");
    }

    update(delta: number, input: KeyboardInput) {
        this.background.update(delta, input);
        this.labelPause.update(delta, input);
    }

    draw() {
        this.background.draw();
        this.labelPause.draw();
    }
}