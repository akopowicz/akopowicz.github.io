class Renderer {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
    }

    getCanvas = () => {
        return this.canvas;
    }

    getContext = () => {
        return this.context;
    }

    drawRect = (x, y, width, height, color) => {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    drawCircle = (x, y, radius, color) => {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI,false);
        this.context.closePath();
        this.context.fill();
    }

    drawText = (text, x, y, color) => {
        this.context.fillStyle = color;
        this.context.font = "40px Verdana";
        this.context.fillText(text, x, y);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Renderer();
        }

        return this.instance;
    }
}

export default Renderer;