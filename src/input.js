class Input {
    constructor() {
        this.keys = {};
        this.addDefaultListeners();
    }

    addDefaultListeners() {
        this.addListener(KEY_DOWN, 40);
        this.addListener(KEY_DOWN, 83);
        this.addListener(KEY_UP, 38);
        this.addListener(KEY_UP, 87);
        this.addListener(KEY_LEFT, 37);
        this.addListener(KEY_LEFT, 65);
        this.addListener(KEY_RIGHT, 39);
        this.addListener(KEY_RIGHT, 68);
    }

    keyDown(key) {
        if (this.keys[key] == undefined) return false;

        var down = false;
        this.keys[key].forEach((v) => down = down || v.isDown);
        return down;
    }

    addListener(key, code) {
        if (this.keys[key] == undefined) {
            this.keys[key] = [this.keyListener(code)];
        } else {
            this.keys[key].push(this.keyListener(code));
        }
    }

    keyListener(keyCode) {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;

        key.downHandler = event => {
          if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
          }
          event.preventDefault();
        };
      
        key.upHandler = event => {
          if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
          }
          event.preventDefault();
        };
      
        window.addEventListener(
          "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
          "keyup", key.upHandler.bind(key), false
        );
        return key;
      }
}