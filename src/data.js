const GAME_WIDTH = 320;
const GAME_HEIGHT = 240;

const ASSETS_MAP = "assets/pattern.png";

Math.fmod = (a,b) => { return Number((a - (Math.floor(a / b) * b))); };

