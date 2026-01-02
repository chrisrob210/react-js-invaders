import { useEffect, useRef } from "react";
import { GameManager } from "./game/managers/GameManager";
import { Input } from "./game/Input";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;
    const canvas = currentCanvas

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context

    canvas.width = 800;
    canvas.height = 600;

    let lastTime = 0;
    let isRunning = false;
    //let x = 100;

    const gameManager = new GameManager(canvas.width, canvas.height)
    const input = new Input()

    const handleKeyDown = (e: KeyboardEvent) => input.onKeyDown(e);
    const handleKeyUp = (e: KeyboardEvent) => input.onKeyUp(e);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    function loop(time: number) {
      if (!isRunning) return;
      const delta = time - lastTime;
      lastTime = time;

      // Clear
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update
      // x += 0.1 * delta;

      // if (x > canvas.width) {
      //   x = -50;
      // }

      gameManager.update(delta, input);
      gameManager.draw(ctx);

      // Draw
      // ctx.fillStyle = "white";
      // ctx.fillRect(x, 300, 50, 20);

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

export default App;
