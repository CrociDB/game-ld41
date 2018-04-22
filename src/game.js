class Game {
    constructor() {
        this.width = GAME_WIDTH;
        this.height = GAME_HEIGHT;

        this.state = null;

        this.deltaTime = 0;
        this.input = new Input();
    }

    run() {
        this.initPIXI();
        this.preloadAssets();
    }

    preloadAssets() {
        PIXI.loader
            .add(ASSETS_MAP)
            .load(this.startGame.bind(this));
    }

    startGame() {
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

        this.initFilters();
    }

    initFilters() {
        var bloom = new PIXI.filters.BloomFilter();
        var aberration = new PIXI.filters.RGBSplitFilter();
        aberration.red.x = 0;
        aberration.red.y = 1.5;
        aberration.green.x = 1.5;
        aberration.green.y = 0;
        var crt = new PIXI.filters.CRTFilter();
        crt.curvature = 6;
        crt.noise = 0.1;
        crt.lineContrast = .2;
        this.app.stage.filters = [bloom, aberration, crt];
    }

    update(delta) {
        this.deltaTime = delta;

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


