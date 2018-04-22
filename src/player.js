class Player {
    constructor() {
        this.fov = 3.14159 / 4.0;

        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.1;

        this.speed = 0.006;

        this.angle = 0.0;
    }

    update(deltaTime) {
        this.getInput(deltaTime);
        this.updateSpeed(deltaTime);
    }

    updateSpeed(deltaTime) {
        this.x += Math.cos(this.angle) * this.speed * deltaTime;
        this.y += Math.sin(this.angle) * this.speed * deltaTime;
    }

    getInput(deltaTime) {
        if (game.input.keyDown(KEY_UP)) {
            this.z += 0.005 * deltaTime;
        }
        
        if (game.input.keyDown(KEY_DOWN)) {
            this.z -= 0.005 * deltaTime;
        }
    
        // if (game.input.keyDown(KEY_LEFT)) {
        //     this.angle -= 0.05 * deltaTime;
        // }
    
        // if (game.input.keyDown(KEY_RIGHT)) {
        //     this.angle += 0.05 * deltaTime;
        // }
    }
}
