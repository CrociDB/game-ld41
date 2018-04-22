class Map {
    constructor() {
        this.near = 0.005;
        this.far = 0.1;

        this.container = new PIXI.Container(GAME_WIDTH, GAME_HEIGHT);

        let tex = PIXI.loader.resources[ASSETS_MAP].texture;
        this.textureSampler = new TextureSampler(tex);
        
        this.helperCanvas = new HelperCanvas();
        
        this.mapSprite = new PIXI.Sprite(tex);
        this.mapSprite.texture = PIXI.Texture.fromCanvas(this.helperCanvas.canvas);
        this.container.addChild(this.mapSprite);
    }

    update(deltaTime, player) {
        this.drawTerrain(player);

        this.helperCanvas.update();
        this.mapSprite.texture.update();
    }

    drawTerrain(player) {
        let farx1 = player.x + Math.cos(player.angle - player.fov) * (this.far + player.z);
        let fary1 = player.y + Math.sin(player.angle - player.fov) * (this.far + player.z);
        let nearx1 = player.x + Math.cos(player.angle - player.fov) * this.near;
        let neary1 = player.y + Math.sin(player.angle - player.fov) * this.near;
        let farx2 = player.x + Math.cos(player.angle + player.fov) * (this.far + player.z);
        let fary2 = player.y + Math.sin(player.angle + player.fov) * (this.far + player.z);
        let nearx2 = player.x + Math.cos(player.angle + player.fov) * this.near;
        let neary2 = player.y + Math.sin(player.angle + player.fov) * this.near;
        
        for (let y = 1; y < GAME_HEIGHT / 2; y++) {
            let sampleDepth = y / (GAME_HEIGHT / 2);
            
            let startX = (farx1 - nearx1) / (sampleDepth) + nearx1;
            let startY = (fary1 - neary1) / (sampleDepth) + neary1;
            let endX = (farx2 - nearx2) / (sampleDepth) + nearx2;
            let endY = (fary2 - neary2) / (sampleDepth) + neary2;
            
            for (let x = 1; x < GAME_WIDTH; x++) {
                let sampleWidth = x / GAME_WIDTH;
                let sampleX = (endX - startX) * sampleWidth + startX;
                let sampleY = (endY - startY) * sampleWidth + startY;
                
                let color = this.textureSampler.getColorAtNormalized(sampleX, sampleY);
                this.helperCanvas.putDataPixel(x, y + GAME_HEIGHT / 2, color);
            }
        }
    }
}

class HelperCanvas {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        this.context = this.canvas.getContext('2d');
        this.imageData = this.context.createImageData(GAME_WIDTH, GAME_HEIGHT);
    }

    putDataPixel(x, y, color) {
        let i = (x + (y * GAME_WIDTH)) * 4;
        this.imageData.data[i] = color.r;
        this.imageData.data[i+1] = color.g;
        this.imageData.data[i+2] = color.b;
        this.imageData.data[i+3] = 255;
    }

    update() {
        this.context.putImageData(this.imageData, 0, 0);
    }
}

class TextureSampler {
    constructor(texture) {
        let sprite = new PIXI.Sprite(texture);
        this.renderTexture = new PIXI.RenderTexture.create(texture.width, texture.height);
        game.app.renderer.render(sprite, this.renderTexture);
        sprite.destroy();
        
        this.data = game.app.renderer.extract.pixels(this.renderTexture);
    }

    getColorAt(x, y) {
        let i = (x + (y * this.renderTexture.width)) * 4;
        return { r: this.data[i], g: this.data[i + 1], b: this.data[i + 2] };
    }

    getColorAtNormalized(x, y) {
        let px = Math.floor(Math.fmod(x, 1.0) * this.renderTexture.width);
        let py = Math.floor(Math.fmod(y, 1.0) * this.renderTexture.height);
        return this.getColorAt(px, py);
    }
}
