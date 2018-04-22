class Player {
    constructor() {
        this.fov = 3.14159 / 4.0;

        this.x = 0.0;
        this.y = 0.0;
        this.angle = 0.5;
    }

    update(deltaTime) {
        this.getInput(deltaTime);
    }

    getInput(deltaTime) {
        if (game.input.keyDown(KEY_UP)) {
            this.x += Math.cos(this.angle) * 0.003 * deltaTime;
            this.y += Math.sin(this.angle) * 0.003 * deltaTime;
        }
    
        if (game.input.keyDown(KEY_DOWN)) {
            this.x -= Math.cos(this.angle) * 0.003 * deltaTime;
            this.y -= Math.sin(this.angle) * 0.003 * deltaTime;
        }
    
        if (game.input.keyDown(KEY_LEFT)) {
            this.angle -= 0.05 * deltaTime;
        }
    
        if (game.input.keyDown(KEY_RIGHT)) {
            this.angle += 0.05 * deltaTime;
        }
    }
}
