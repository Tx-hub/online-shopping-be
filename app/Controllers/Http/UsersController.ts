import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User  from "App/Models/User";

export default class UsersController {
  public async create({request}:HttpContextContract) {
    const username = request.only(["username"]).username
    const password = request.only(["password"]).password
    const user = new User()
    user.username = username
    user.password = password
    User.create(user)
    return {
      "status":1,
      "msg":"创建成功",
      "data":user
    }
  }
}
