// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import RestResponse from "App/Common/RestResponse";
// import Redis from "@ioc:Adonis/Addons/Redis";
var ws = require('nodejs-websocket');
var server = ws.createServer()
var tcpPortUsed = require('tcp-port-used');


export default class OrdersController {

  //当下游用户接受时
  public async server_register() {
    tcpPortUsed.
    tcpPortUsed.waitUntilFree(3000)
      .then(function() {
        server.listen(3000)
      }, function(err) {
        console.log('Error:', err.message);
      });

  }

  //当用户发起购买时
  public async send({ request }: HttpContextContract) {
    const username = request.input('username')
    try{
      // await Redis.publish('cctv4', JSON.stringify({ username: username }))
      await this.receiver(username)
      return RestResponse.SUCCESS({"username":username},'购买成功')
    }catch (Error){
      return RestResponse.REDIS_ERROR()
    }
  }

  //发送购买用户时
  public async receiver(text){
    server.connections.forEach((conn) => {
      conn.sendText(text);
    })
  }

}
