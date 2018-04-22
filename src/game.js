class Game {
    constructor() {
        this.width = 320;
        this.height = 240;

        this.state = null;
        this.state = null;
    }

    run() {
        this.initPIXI();
        this.setState(new GamePlay());
    }

    setState(state) {
        if (this.state != null) {
            this.state.exit(this);
        }

        this.state = state;
        this.state.enter(this);
    }

    initPIXI() {
        let type = "WebGL";
        if (!PIXI.utils.isWebGLSupported()) type = "canvas";
        
        this.app = new PIXI.Application({
            width: this.width,
            height: this.height,
            resolution: 2
        })

        document.body.appendChild(this.app.view);
        this.app.ticker.add(delta => this.update(delta));
    }

    update(delta) {
        if (this.state != null) {
            this.state.update(this);
        }
    }
}

var game;
(function() {
    game = new Game();
    game.run();
})();


