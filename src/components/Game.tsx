import { useEffect, useRef } from "react";
import { GameManager } from "./engine/GameManager";
import { KeyboardInput } from "../controls/KeyboardInput";
import { CanvasContext } from "./engine/CanvasContext";

export default function Game() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const currentCanvas = canvasRef.current;
        if (!currentCanvas) return;
        const canvas = currentCanvas

        const context = canvas.getContext("2d");
        if (!context) return;
        const ctx = context

        // Initialize CanvasContext singleton
        CanvasContext.getInstance().setContext(ctx);

        canvas.width = GameManager.screenWidth;
        canvas.height = GameManager.screenHeight;

        let lastTime = 0;
        let isRunning = false;

        const gameManager = new GameManager(canvas.width, canvas.height)
        const input = new KeyboardInput()

        const handleKeyDown = (e: KeyboardEvent) => input.onKeyDown(e);
        const handleKeyUp = (e: KeyboardEvent) => input.onKeyUp(e);

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        function loop(time: number) {
            if (!isRunning) return;
            const delta = time - lastTime;
            lastTime = time;

            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            gameManager.update(delta, input);
            gameManager.draw();

            requestAnimationFrame(loop);
        }

        isRunning = true;
        requestAnimationFrame(loop);

        return () => {
            isRunning = false;
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };

    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#111",
                width: "100vw"
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    border: "1px solid #333",
                    display: "block",
                    margin: "40px auto",
                }}
            />
        </div>
    );
}
