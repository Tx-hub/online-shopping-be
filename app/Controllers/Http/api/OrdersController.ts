import Ws from 'App/Services/Ws'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import RestResponse from "App/Common/RestResponse";



export default class OrdersController {



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
    Ws.io.emit('TEAM_NOTICE', { text })
  }

}
