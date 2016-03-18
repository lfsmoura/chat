var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

var Chat = function() {

};

Chat.prototype.preload = function() {
  this.load.image('background', 'assets/bg.png');
  this.load.spritesheet('charset', 'assets/charset.png', 24, 32);
};

Chat.prototype.createPlayer = function(x, y) {
  var player = game.add.sprite(x, y, 'charset');
  player.animations.add('up', [0, 1, 2, 1], 5, true);
  player.animations.add('right', [12, 13, 14, 13], 5, true);
  player.animations.add('down', [24, 25, 26, 25], 5, true);
  player.animations.add('left', [36, 37, 38, 37], 5, true);
  player.animations.play('down');
  return player;
};

Chat.prototype.create = function() {
  this.stage.disableVisibilityChange = true;
  this.bg = this.add.tileSprite(0, 0, 640, 480, 'background');
  this.bg.fixedToCamera = true;

  socket.on('message', function receive(msg) {
    console.log(msg.user_id);
    var player = this.players[msg.user_id];
    if (player) {
      if (!this.names[msg.user_id]) {
        var username = game.add.text(msg.username.length*-2, 35, msg.username, { font: "10px Arial", fill: "#ffffff" });
        player.add(username);
        this.names[msg.user_id] = msg.username;
      }
    } else {
      player = { x: 580, y: 350 };
    }
    this.addMessage(msg.message, player.x - 55, player.y - 60);
  }.bind(this));

  this.names = {};
  this.players = {};
  this.player = this.players[socket.id] = game.add.group();
  this.player.x = 250;
  this.player.y = 350;
  var char = this.createPlayer(0,0);
  this.player.add(char);

  socket.on('changePos', function(pos) {
    console.log(pos);
    if (!this.players[pos.user_id]) {
      this.players[pos.user_id] = game.add.group();
      this.players[pos.user_id].x = -100;
      this.players[pos.user_id].y = 350;
      this.players[pos.user_id].add(this.createPlayer(0,0));
    }
    this.add.tween(this.players[pos.user_id]).to({ x: pos.x, y: pos.y }, 2000, Phaser.Easing.Linear.None, true);
  }.bind(this));
}

Chat.prototype.addMessage = function(msg, x, y) {
  var box = game.add.group();
  var rec = game.add.graphics(0, 0);
  box.add(rec);
  rec.beginFill(0xCCCCCC, 1);
  //rec.bounds = new PIXI.Rectangle(x, y, 150, 80);
  rec.drawRect(x, y, 150, 30);

  var text = game.add.text(x + 5, y + 5, msg, { font: "16px Arial", fill: "#ffffff" });
  text.setShadow(2, 2, 'rgba(1,1,1,0.9)', 0);
  box.add(text);
  var appear = game.add.tween(box).from({ alpha: 0, y:  y + 10}, 200, Phaser.Easing.Linear.None, true);
  var fade = game.add.tween(box).to({ y: y + 100, alpha: 0 }, 200, Phaser.Easing.Linear.None, false, 1500);

  appear.chain(fade);
  fade.onComplete.add(function() {
    box.destroy();
  });
};

var movePlayer = _.debounce(function(x, y, player, game){
  socket.emit('move', { x: x, y: y, user_id: socket.id });
}, 100);

Chat.prototype.update = function() {
  if (this.input.activePointer.isDown) {
    movePlayer(this.input.activePointer.x - 12, this.input.activePointer.y - 12, this.player, this);
  }
}

game.state.add('Chat', Chat, true);
