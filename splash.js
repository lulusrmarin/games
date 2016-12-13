// Marin Library for Creating Games Using Phaser
// Print A centered Sprite using a key value.
function print_centered_sprite(key,xOffset = 0,yOffset = 0) {
	key = game.add.sprite(0,0,key,0); // Draw the sprite at x:0, y:0
	key.visible = false; // But then quickly make it invisible
	key.x = ((gameWidth - key.width) / 2) + xOffset; // Set the key X to exact center
		// Using a formula from the width of the game and width of the object.
	key.y = ((gameHeight - key.height) / 2) + yOffset; // Ditto for Y
	key.visible = true; // Make the key now visible

	// console.log(key);
	return key;
}

// Hover a sprite using tweens
// Todo:  Add a number of times or indefinitely to this
// 		Currently only floats up and down a couple times for the logo
function hover_sprite(key,x,y) {
	tween = game.add.tween(key).to( { y: key.y - 10 }, 1000, Phaser.Easing.Out, true);
	setTimeout(function(){ tween = game.add.tween(key).to( { y: key.y + 20 }, 1000, Phaser.Easing.Out, true); }, 1000);
	setTimeout(function(){ tween = game.add.tween(key).to( { y: key.y - 20 }, 1000, Phaser.Easing.Out, true); }, 2000);
	setTimeout(function(){ tween = game.add.tween(key).to( { y: key.y + 20 }, 1000, Phaser.Easing.Out, true); }, 3000);
	setTimeout(function(){ tween = game.add.tween(key).to( { y: key.y - 20 }, 1000, Phaser.Easing.Out, true); }, 4000);
	setTimeout(function(){ tween = game.add.tween(key).to( { y: key.y + 20 }, 1000, Phaser.Easing.Out, true); }, 5000);
}

function load_splash_screen() {
	// Splash screen load
	game.load.image("logoGhost","mlib/logo-ghost.png");
	game.load.image("logoWords","mlib/logo-words.png");
	game.load.audio("splash","sounds/splash.wav");
}

function load_happy_fish() {
	game.load.image("fish-top","images/fish-top.png");
	game.load.image("fish-bottom","images/fish-bottom.png");
	game.load.image("fish-eyes","images/fish-eyes.png");
}

// Marin splash screen.
// Currently consists of one simple color and printing the logo centered.
function print_marin_splash_screen(splashTime) {
	game.stage.backgroundColor = "EB5FA1"; // BG color

	logoGhost = print_centered_sprite('logoGhost');	// Logo Ghost
	logoWords = print_centered_sprite('logoWords',0,100);	// Logo Words

	hover_sprite(logoGhost); // Call the Hover Sprite function and hover just the ghost.
	splash = game.add.audio('splash');
	//splash.play();

	setTimeout(function(){logoWords.destroy(); logoGhost.destroy(); }, splashTime);
}

function draw_fish(x,y,color) {
	fishSpriteBottom = game.add.sprite(0,0,'fish-bottom',0);
	fishSpriteTop = game.add.sprite(-12,-105,'fish-top',0);
	fishSpriteEyes = game.add.sprite(20,-100,'fish-eyes',0);
	fishSpriteTop.tint = color;

	fishGroup[fishCount] = game.add.group();
	fishGroup[fishCount].scale.setTo(0.3,0.3);
	fishGroup[fishCount].add(fishSpriteBottom);
	fishGroup[fishCount].add(fishSpriteTop);
	fishGroup[fishCount].add(fishSpriteEyes);
	//fishGroup.setAll('anchor.x', 0.5);
	//fishGroup.setAll('anchor.y', 0.5);
	fishGroup[fishCount].x = x;
	fishGroup[fishCount].y = y;

	fishGroup[fishCount].pivot.x = 52;
	fishGroup[fishCount].pivot.y = 52;

	fishCount++;
	return fishGroup;
}

function tween_jaw() {
	// Some variables for this 'function';
	distance = 35;
	time = 600;

	tween = game.add.tween(fishSpriteBottom).to( { y: fishSpriteBottom.y - distance }, time, Phaser.Easing.Out, true);
	setTimeout(function(){ tween = game.add.tween(fishSpriteBottom).to( { y: fishSpriteBottom.y + distance }, time, Phaser.Easing.Out, true); }, time);
	setTimeout(function(){ tween = game.add.tween(fishSpriteBottom).to( { y: fishSpriteBottom.y - distance }, time, Phaser.Easing.Out, true); }, time * 2);
	setTimeout(function(){ tween = game.add.tween(fishSpriteBottom).to( { y: fishSpriteBottom.y + distance }, time, Phaser.Easing.Out, true); }, time * 3);
}

function initiate_fish() {
	game.stage.backgroundColor = "000000"; // BG color
	draw_fish(300,200,0x0000ff);
	draw_fish(100,100,0x00ffff);
	draw_fish(500,100,0xffff00);
	draw_fish(300,300,0xff0000);
	tween_jaw();
}

// Game Begin
// Game Dimensions
var gameWidth = 600;
var gameHeight = 480;
var splashTime = 3500;

var fishGroup = [];
var fishCount = 0;

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
}
