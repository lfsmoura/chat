var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

var Chat = function() {

};

Chat.prototype.preload = function() {
  this.load.image('background', 'assets/bg.png');
  this.load.spritesheet('charset', 'assets/charset.png', 24, 32);
};

Chat.prototype.createPlayer = function(x, y, id) {
  var player = game.add.sprite(x, y, 'charset');
  var offset = (id.charCodeAt(0) % 4) * 3;
  player.animations.add('up', [offset + 1, offset + 2, offset + 1, offset], 5, true);
  player.animations.add('right', [offset + 13, offset + 14, offset + 13, offset + 12], 5, true);
  player.animations.add('down', [offset + 25, offset + 26, offset + 25, offset + 24], 5, true);
  player.animations.add('left', [offset + 37, offset + 38, offset + 37, offset + 36], 5, true);
  player.animations.play('down');
  return player;
};

var direction = function(x0, y0, x1, y1) {
  var angle = Phaser.Math.angleBetween(x0, y0, x1, y1);
  var dir = angle + Math.PI/4;

  if (Math.PI/4 < angle && angle < 3*Math.PI/4) {
    return 'down'
  } else if (-Math.PI/4 < angle && angle < Math.PI/4) {
    return 'right'
  } else if (-3*Math.PI/4 < angle && angle < -Math.PI/4) {
    return 'up'
  }
  return 'left';
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
  var char = this.createPlayer(0, 0, socket.id);
  this.player.add(char);

  socket.on('changePos', function(pos) {
    var player = this.players[pos.user_id];
    if (!player) {
      player = game.add.group();
      this.players[pos.user_id] = player;
      player.x = -100;
      player.y = 350;
      player.add(this.createPlayer(0, 0, pos.user_id));
    }
    player.children[0].animations.play(direction(player.x, player.y, pos.x, pos.y));

    var time = Phaser.Math.distance(player.x, player.y, pos.x, pos.y)*4;
    this.add.tween(player).to({ x: pos.x, y: pos.y }, time, Phaser.Easing.Linear.None, true)
      .onComplete.add(function() {
        player.children[0].animations.stop(null,true);
      });
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
