const GAME_WIDTH = 320;
const GAME_HEIGHT = 240;

const ASSETS_MAP = "assets/pattern.png";

const KEY_LEFT = "keyleft";
const KEY_RIGHT = "keyright";
const KEY_UP = "keyup";
const KEY_DOWN = "keydown";

Math.fmod = (a,b) => { return Number((a - (Math.floor(a / b) * b))); };

