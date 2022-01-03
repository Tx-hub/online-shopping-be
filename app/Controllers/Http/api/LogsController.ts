// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Logs from "App/Models/Log";
import RestResponse from "App/Common/RestResponse";

export default class LogsController {
  // 添加日志
  public async add({ request }: HttpContextContract) {
    const username =  request.input("username")
    const logs = new Logs()
    logs.username = username
    try{
      await Logs.create(logs)
      return RestResponse.SUCCESS("","添加成功")
    }catch (error){
      return RestResponse.SUCCESS("","添加失败")
    }
  }

  //分页查询
  public async all({ request }: HttpContextContract) {
    const username =  request.input("username")
    const pagenum =  request.input("pagenum")
    const pagesize =  request.input("pagesize")
    try{
      const Log = await Logs.query().where("name","like",username+"%").paginate(pagenum,pagesize)
      return RestResponse.SUCCESS({'Logs':Log},"查询成功")
    }catch (Error){
      return RestResponse.DB_ERROR()
    }
  }

  //test
  public async show({ params }: HttpContextContract) {
    return params
    const good = await Logs.find(params.id)
    return good
  }

}
