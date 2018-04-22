class GamePlay {
    constructor() {
        this.player = new Player();
        this.map = new Map();
    }
    
    enter(game) {
        this.container = new PIXI.Container();
        game.app.stage.addChild(this.container);
        
        this.container.addChild(this.map.container);
    }
    
    update(game) {
        this.map.update(game.deltaTime, this.player);
    }
    
    exit(game) {
        game.app.stage.removeChild(this.container);
    }
}
