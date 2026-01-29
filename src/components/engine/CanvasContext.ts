export class CanvasContext {
    private static instance: CanvasContext;
    private context: CanvasRenderingContext2D | null = null;

    private constructor() {}

    static getInstance(): CanvasContext {
        if (!CanvasContext.instance) {
            CanvasContext.instance = new CanvasContext();
        }
        return CanvasContext.instance;
    }

    setContext(ctx: CanvasRenderingContext2D): void {
        this.context = ctx;
    }

    getContext(): CanvasRenderingContext2D {
        if (!this.context) {
            throw new Error("Canvas context has not been initialized. Call setContext() first.");
        }
        return this.context;
    }
}
