// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Logs from "App/Models/Log";

export default class LogsController {
  // 添加日志
  public async add({ request }: HttpContextContract) {
    const username =  request.input("username")
    const logs = new Logs()
    logs.username = username
    try{
      await Logs.create(logs)
      return {'data':"添加成功",'status':200}
    }catch (error){
      return {'data':"添加失败",'status':201}
    }
  }

  //分页查询
  public async all({ request }: HttpContextContract) {
    const username =  request.input("username")
    const pagenum =  request.input("pagenum")
    const pagesize =  request.input("pagesize")
    const Log = await Logs.query().where("name","like",username+"%").paginate(pagenum,pagesize)
    return {'Logs':Log,'status':200}
  }

  public async show({ params }: HttpContextContract) {
    return params
    const good = await Logs.find(params.id)
    return good
  }

}
