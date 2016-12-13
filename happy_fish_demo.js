// Marin Library for Creating Games Using Phaser
// Print A centered Sprite using a key value.
function print_centered_sprite(key,xOffset = 0,yOffset = 0,scale = 1) {
	key = game.add.sprite(0,0,key,0); // Draw the sprite at x:0, y:0
	key.visible = false; // But then quickly make it invisible
	key.scale.setTo(1,1); // Scale the sprite ideally before doing math with this object's values.
	key.x = ((gameWidth - key.width) / 2) + xOffset; // Set the key X to exact center
		// Using a formula from the width of the game and width of the object.
	key.y = ((gameHeight - key.height) / 2) + yOffset; // Ditto for Y
	key.visible = true; // Make the key now visible
	// console.log(key);
	return key;
}

// Hover a sprite using tweens
// Tweens up and down in a range with a time infinitely.
function hover_sprite(key,x,y) {
	distance = 15;
	time = 1000;

	tween = game.add.tween(key).to( { y: key.y - distance }, time, Phaser.Easing.Out, true)
		.to( { y: key.y + distance }, time, Phaser.Easing.Out).loop();
}

// Load Marin Games Splash Assets
function load_splash_screen() {
	// Splash screen load
	game.load.image("logoGhost","mlib/logo-ghost.png");
	game.load.image("logoWords","mlib/logo-words.png");
	game.load.audio("splash","sounds/splash.wav");
}

// Load Happy Fish assets
function load_happy_fish() {
	game.load.image("fish-top","images/fish-top.png");
	game.load.image("fish-bottom","images/fish-bottom.png");
	game.load.image("fish-eyes","images/fish-eyes.png");
	game.load.image("arena","images/arena.png");
    game.load.image("star","images/star.png");
    game.load.image("bg","images/bg.png");

    game.load.audio("blop","sounds/blop.wav");
    game.load.audio("theme","sounds/theme.mp3");
}

// Marin splash screen.
// Currently consists of one simple color and printing the logo centered.
function print_marin_splash_screen(splashTime) {
	game.stage.backgroundColor = "EB5FA1"; // BG color

	logoGhost = print_centered_sprite('logoGhost',0,-20);	// Logo Ghost
	logoWords = print_centered_sprite('logoWords',0,100);	// Logo Words

	hover_sprite(logoGhost); // Call the Hover Sprite function and hover just the ghost.
	splash = game.add.audio('splash');
	splash.play();

	setTimeout(function(){logoWords.destroy(); logoGhost.destroy(); }, splashTime);
}

function kill_fish(val) {
    fishGroup[val].destroy();
    fishMagnetSprite[val].input.enabled = false;
}

function random_hex() {
	hex = "0x" + (Math.random() * 0xFFFFFF << 0).toString(16);
	return hex;
}

function particleBurst(x,y) {

    emitter = game.add.emitter(0, 0, 100);
    emitter.makeParticles('star');
    emitter.gravity = 200;

    //  Position the emitter where the mouse/touch event was
    emitter.x = x;
    emitter.y = y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitter.start(true, 2000, null, 10);
    console.log(emitter);

}

var fishHole = [];
function draw_fish(x,y,color) {
    var count = fishCount;
	// Draw a circle behind the fish
	fishHole[fishCount] = draw_circle_full(0x111111,x -1,y,30);
	// Draw a magnet inside the fish
	fishMagnet[fishCount] = draw_circle_full(0xAAAAAA,x -1,y,30);
	fishMagnet[fishCount].visible = false;
	// Create an array of these sprites
	fishMagnetSprite[fishCount] = game.add.sprite(50,-30,fishMagnet[fishCount].generateTexture());
	fishMagnetSprite[fishCount].inputEnabled = true;
	fishMagnetSprite[fishCount].input.useHandCursor = true;
	fishMagnetSprite[fishCount].events.onInputDown.add(
        function(){ kill_fish(count);
        particleBurst(x,y)
	    blop = game.add.audio('blop');
        blop.play();
                  }, this);

	fishSpriteBottom = game.add.sprite(0,0,'fish-bottom',0);
	tween_jaw(fishSpriteBottom);

	fishSpriteTop = game.add.sprite(-12,-105,'fish-top',0);
	fishSpriteEyes = game.add.sprite(20,-100,'fish-eyes',0);
	fishSpriteTop.tint = color;

	fishGroup[fishCount] = game.add.group();
	fishGroup[fishCount].scale.setTo(0.3,0.3);

    fishGroup[fishCount].add(fishMagnetSprite[fishCount]);
	fishGroup[fishCount].add(fishSpriteBottom);
	fishGroup[fishCount].add(fishSpriteTop);
	fishGroup[fishCount].add(fishSpriteEyes);

	fishGroup[fishCount].x = x;
	fishGroup[fishCount].y = y;

	fishGroup[fishCount].pivot.x = 80;
	fishGroup[fishCount].pivot.y = 0;

    console.log(fishGroup);

	fishCount++;
	return fishGroup;
}

function tween_jaw(sprite) {
	// Some variables for this 'function';
	distance = 35;
	time = 600;

	tween = game.add.tween(sprite).to( { y: sprite.y - distance }, time, Phaser.Easing.Out, true)
		.to( { y: sprite.y + distance }, time, Phaser.Easing.Out).loop();
}

function draw_circle_full(color,x,y,rad) {
	var circle = game.add.graphics(0, 0);
	circle = circle.beginFill(color, 1);
    circle = circle.drawCircle(x, y, rad);
	return circle;
}

function initiate_fish() {
	game.stage.backgroundColor = "000000"; // BG color
    bg = game.add.sprite(0,0,'bg');
    bg.scale.setTo(0.7,0.7);

	arena = print_centered_sprite('arena',250,250,0.65);
	arena.anchor.setTo(0.5,0.5);

    // Play the annoying ass music
    theme = game.add.audio('theme');
    theme.play();

	draw_fish(300,200,random_hex());
	draw_fish(200,200,random_hex());
	draw_fish(400,100,random_hex());
	draw_fish(300,300,random_hex());
}
/////////////////////////////////////////////////////////////////////
////////        All library up there.
///////////////////////////////////////////////////////////

// Game Begin
// Game Dimensions
var gameWidth = 600;
var gameHeight = 480;
var splashTime = 3000;

// Create an array and count of how many fish in group.
var fishMagnet = [];
var fishGroup = [];
var fishCount = 0;
var fishMagnetSprite = [];
var arena;

// New Game Object
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
	load_splash_screen();
	load_happy_fish();
}

function create() {
	// Splash screen first
	print_marin_splash_screen(splashTime);
	setTimeout(function(){ initiate_fish(); }, splashTime);
}

function update() {
	if(typeof fishGroup[0] != 'undefined') { fishGroup[0].rotation += 0.05;}
	if(typeof fishGroup[1] != 'undefined') { fishGroup[1].rotation -= 0.05;}
	if(typeof fishGroup[2] != 'undefined') { fishGroup[2].rotation += 0.1;}
	if(typeof fishGroup[3] != 'undefined') { fishGroup[3].rotation -= 0.1;}
	if(typeof arena != 'undefined') { arena.rotation += 0.01;}
}
