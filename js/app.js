// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // this.explode = 'images/explode.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //uses dt to run at the same speed across different computers / browsers
    this.x += this.speed * dt;
    //once enemies are out of bounds, reset position and start with diff speed
    if(this.x > 510){
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 128);
    }
    //collision detection
    if(player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// const Explode = function(){
//     this.sprite = 'images/explode.png';
// };
// Explode.prototype.render = function(){
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function() {
    // console.log('player update prototype called');
    //prevent player from moving beyond game boundaries
    if(this.y > 380){
        this.y = 380;
    }
    if(this.x > 400){
        this.x = 400;
    }
    if(this.x < 0){
        this.x = 0;
    }
    //win condition / resets player position back to start after 200ms
    if(this.y < 0){
        setTimeout(() => {
            this.x = 200;
            this.y = 380;
        }, 200);
    }
}; 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(input) {
    switch(input){
        case 'left':
        this.x -= 100;
        break;
        case 'right':
        this.x += 100;
        break;
        case 'up':
        this.y -= 80;
        break;
        case 'down':
        this.y += 80;
        break;
    }
};
// Now instantiate your objects.
//position player at location
const player = new Player(200,380);
// const explode = new Explode();
// Place all enemy objects in an array called allEnemie
// Place the player object in a variable called player
const allEnemies = [];
//position enemies at first blocks of the yAxis
const enemyLoc = [60,140,220];
enemyLoc.forEach(function(yAxis) {
    const enemy = new Enemy(0, yAxis, 100 + Math.floor(Math.random() * 128));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
