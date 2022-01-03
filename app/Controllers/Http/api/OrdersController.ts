// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import RestResponse from "App/Common/RestResponse";
import Redis from "@ioc:Adonis/Addons/Redis";

export default class OrdersController {

  //当用户发起购买时
  public async send({ request }: HttpContextContract) {
    const username = request.input('username')
    try{
      await Redis.publish('cctv1', JSON.stringify({ username: username }))
      return RestResponse.SUCCESS({"username":username},'购买成功')
    }catch (Error){
      return RestResponse.REDIS_ERROR()
    }
  }

}
