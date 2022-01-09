import Ws from 'App/Services/Ws'
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import RestResponse from "App/Common/RestResponse";
import {DateTime} from "luxon";
import Redis from "@ioc:Adonis/Addons/Redis";




export default class OrdersController {

  public async check(name){
    try{
       setInterval(async (name)=>{
        const lockKey = 'tuxiao'
        const result = await Redis.setnx(lockKey, DateTime.now().toString())
        Redis.expire(lockKey,10)
        if(result == 0){
          await this.receiver({"username":name,"time":await Redis.get(lockKey)})
        }else{

          Redis.del(lockKey)
          return
        }
      },1000,name)
    }catch (e){
      return RestResponse.REDIS_ERROR()
    }
  }

  //当用户发起购买时
  public async send({ request }: HttpContextContract) {
    const username = request.input('username')
    try{
      const lockKey = 'tuxiao'
      const order_time = DateTime.now().toString()
      const result = await Redis.setnx(lockKey, order_time)
      if(result == 0){
         this.check(username)
      }
      await Redis.setnx(lockKey, order_time)
      // await Redis.publish('cctv4', JSON.stringify({ username: username }))
      await this.receiver({"username":username,"time":DateTime.now()})
      return RestResponse.SUCCESS({"username":username,"time":Date.now()},'购买成功')
    }catch (Error){
      return RestResponse.REDIS_ERROR()
    }
  }

  //发送购买用户时
  public async receiver(text){
    Ws.io.emit('TEAM_NOTICE', { text })
  }

}

