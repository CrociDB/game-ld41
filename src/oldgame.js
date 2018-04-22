let app;

let sw = 384;
let sh = 288;

var fieldOfView = 3.14159 / 4.0;
var posX = 0.0;
var posY = 0.0;
var posA = 0.5;
var near = 0.005;
var far = 0.1;
var mapSize = 640;
var deltaTime = 0;

let sprite;

Math.fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b))); };

(function() {
    let type = "WebGL";
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas";
    }
    
    PIXI.utils.sayHello(type);
    
    app = new PIXI.Application({width: sw, height: sh, resolution: 2});
    document.body.appendChild(app.view);
    
    createCanvasTexture();
    loadAssets();
})();

var newCanvas;
var newContext;
var imageData;
function createCanvasTexture() {
    newCanvas = document.createElement('canvas');
    newCanvas.width  = sw;
    newCanvas.height = sh;
    newContext = newCanvas.getContext('2d');
    imageData = newContext.createImageData(sw, sh);
    // document.body.appendChild(newCanvas);

    // for (let i = 0; i < sw; i++)
    // {
    //     for (let j = 0; j < sh; j++)
    //     {
    //         let r = (Math.random() * 255);
    //         let g = (Math.random() * 255);
    //         let b = (Math.random() * 255);

    //         newContext.fillStyle = "rgba("+r+","+g+","+b+","+(255)+")";
    //         newContext.fillRect( i, j, 1, 1 ); 
    //     }
    // }
}

let left = keyboard(37),
up = keyboard(38),
right = keyboard(39),
down = keyboard(40),
key_q = keyboard(81),
key_e = keyboard(69),
key_a = keyboard(65),
key_d = keyboard(68),
key_z = keyboard(90),
key_c = keyboard(67);


function loadAssets() {
    PIXI.loader.add("assets/pattern.png").load(finishedSetup);
}

var renderTexture;
var renderTexturePixels;
function finishedSetup() {
    sprite = new PIXI.Sprite(PIXI.loader.resources["assets/pattern.png"].texture);
    app.stage.addChild(sprite);
    
    let t = PIXI.loader.resources["assets/pattern.png"].texture;
    console.log(t.width, t.height);
    renderTexture = PIXI.RenderTexture.create(t.width, t.height);
    app.renderer.render(sprite, renderTexture);
    renderTexturePixels = app.renderer.extract.pixels(renderTexture);

    sprite.texture = PIXI.Texture.fromCanvas(newCanvas);
    
    // var filter = new PIXI.filters.CRTFilter();
    // app.stage.filters = [filter];
    
    app.ticker.add(delta => update(delta));
}

function getPixel(x, y) {
    let i = (x + (y * renderTexture.width)) * 4;
    return { r: renderTexturePixels[i], g: renderTexturePixels[i + 1], b: renderTexturePixels[i + 2] };
}

function putPixel(x, y, col) {
    newContext.fillStyle = "rgba("+col.r+","+col.g+","+col.b+","+255+")";
    newContext.fillRect( x, y, 1, 1 );
}

function putDataPixel(x, y, col) {
    let i = (x + (y * sw)) * 4;
    imageData.data[i] = col.r;
    imageData.data[i+1] = col.g;
    imageData.data[i+2] = col.b;
    imageData.data[i+3] = 255;
}



function getNPixel(x, y) {
    let px = Math.floor(Math.fmod(x, 1.0) * renderTexture.width);
    let py = Math.floor(Math.fmod(y, 1.0) * renderTexture.height);
    // console.log(px, py);
    // return {r: 0, g: 200, b: 198};
    return getPixel(px, py);
}

function putNPixel(x, y, col) {
    putPixel(x * newContext.width, y * newContext.height, col);
}

function clearCanvas() {
    newContext.clearRect(0, 0, newContext.width, newContext.height);
}


function update(delta) {
    deltaTime = app.ticker.deltaTime;
    // clearCanvas();

        
    let farx1 = posX + Math.cos(posA - fieldOfView) * far;
    let fary1 = posY + Math.sin(posA - fieldOfView) * far;
    
    let nearx1 = posX + Math.cos(posA - fieldOfView) * near;
    let neary1 = posY + Math.sin(posA - fieldOfView) * near;

    let farx2 = posX + Math.cos(posA + fieldOfView) * far;
    let fary2 = posY + Math.sin(posA + fieldOfView) * far;
    
    let nearx2 = posX + Math.cos(posA + fieldOfView) * near;
    let neary2 = posY + Math.sin(posA + fieldOfView) * near;
    
    for (let y = 1; y < sh / 2; y++) {
        let sampleDepth = y / (sh / 2);
        
        let startX = (farx1 - nearx1) / (sampleDepth) + nearx1;
        let startY = (fary1 - neary1) / (sampleDepth) + neary1;
        let endX = (farx2 - nearx2) / (sampleDepth) + nearx2;
        let endY = (fary2 - neary2) / (sampleDepth) + neary2;
        
        for (let x = 1; x < sw; x++) {
            let sampleWidth = x / sw;
            let sampleX = (endX - startX) * sampleWidth + startX;
            let sampleY = (endY - startY) * sampleWidth + startY;
            
            let color = getNPixel(sampleX, sampleY);
            // putPixel(x, y + sh / 2, color);
            putDataPixel(x, y + sh / 2, color);
        }
    }
    
    // Input
    if (up.isDown) {
        posX += Math.cos(posA) * 0.003 * deltaTime;
        posY += Math.sin(posA) * 0.003 * deltaTime;
    }

    if (down.isDown) {
        posX -= Math.cos(posA) * 0.003 * deltaTime;
        posY -= Math.sin(posA) * 0.003 * deltaTime;
    }

    if (left.isDown) {
        posA -= 0.05 * deltaTime;
    }

    if (right.isDown) {
        posA += 0.05 * deltaTime;
    }

    // Near
    if (key_q.isDown) {
        near -= 0.001 * deltaTime;
    }

    if (key_e.isDown) {
        near += 0.001 * deltaTime;
    }
    
    // Far
    if (key_a.isDown) {
        far -= 0.001 * deltaTime;
    }
    
    if (key_d.isDown) {
        far += 0.001 * deltaTime;
    }

    // FoV
    if (key_z.isDown) {
        fieldOfView -= 0.01 * deltaTime;
        console.log(deltaTime);
    }
    
    if (key_c.isDown) {
        fieldOfView += 0.01 * deltaTime;
    }


    // Update texture
    newContext.putImageData(imageData, 0, 0);
    sprite.texture.update();
}


function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
  
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }
