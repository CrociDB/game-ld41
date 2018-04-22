class Player {
    constructor() {
        this.time = 0;
        this.fov = 3.14159 / 4.0;

        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.1;

        this.speed = 0.008;

        this.angle = 0.0;
        this.angularSpeed = 0.0;

        let tex = PIXI.loader.resources[ASSETS_SHIP].texture;
        this.shipSprite = new PIXI.Sprite(tex);

        this.sprite = new PIXI.Container(tex.width, tex.height * 2);
        this.sprite.addChild(this.shipSprite);
        this.sprite.pivot.set(this.shipSprite.width / 2, this.shipSprite.height / 2);
        this.sprite.x = GAME_WIDTH / 2;
        this.sprite.y = GAME_HEIGHT / 2 + 50;
    }

    update(deltaTime) {
        this.time += deltaTime;
        this.getInput(deltaTime);
        this.updateSpeed(deltaTime);
        this.updateSpites();
    }

    updateSpites() {
        this.shipSprite.y = Math.sin(this.time * .08) * 3.5;
    }

    updateSpeed(deltaTime) {
        this.x += Math.cos(this.angle) * this.speed * deltaTime;
        this.y += Math.sin(this.angle) * this.speed * deltaTime;

        this.angularSpeed *= 0.93;
        this.angle += this.angularSpeed;
        this.sprite.rotation = this.angularSpeed * 15;
        this.sprite.x = (GAME_WIDTH / 2) + (this.angularSpeed * 200);
    }

    getInput(deltaTime) {
        // if (game.input.keyDown(KEY_UP)) {
        //     this.z += 0.005 * deltaTime;
        // }
        
        // if (game.input.keyDown(KEY_DOWN)) {
        //     this.z -= 0.005 * deltaTime;
        // }
    
        if (game.input.keyDown(KEY_LEFT)) {
            this.angularSpeed -= 0.004 * deltaTime;
        }
    
        if (game.input.keyDown(KEY_RIGHT)) {
            this.angularSpeed += 0.004 * deltaTime;
        }
    }
}
