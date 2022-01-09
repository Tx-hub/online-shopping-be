import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */


Ws.io.on('connection',function(socket) {
  socket.on('login', function (obj) {
    console.log(obj);
    // 发送数据
    socket.emit('TEAM_NOTICE', {
      msg: `你好${obj.username}`,
      code: 200
    });
  });
});

