const GAME_WIDTH = 320;
const GAME_HEIGHT = 240;

const ASSETS_MAP = "assets/pattern.png";
const ASSETS_SHIP = "assets/ship.png";

const KEY_LEFT = "keyleft";
const KEY_RIGHT = "keyright";
const KEY_UP = "keyup";
const KEY_DOWN = "keydown";

Math.fmod = (a,b) => { return Number((a - (Math.floor(a / b) * b))); };
Math.lerp = (v1, v2, t) => {
	t = t < 0 ? 0 : t;
	t = t > 1 ? 1 : t;
	return v1 + (v2 - v1) * t;
};

let colorLerp = (c1, c2, t) => {
    return { 
        r: Math.lerp(c1.r, c2.r, t), 
        g: Math.lerp(c1.g, c2.g, t),
        b: Math.lerp(c1.b, c2.b, t) 
    };
};

