// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

import Redis from "@ioc:Adonis/Addons/Redis";

export default class OrdersController {

  public async send({ request }: HttpContextContract) {
    const username = request.input('username')
    await Redis.publish('cctv1', JSON.stringify({ username: username }))
    return 'handled'
  }


}
