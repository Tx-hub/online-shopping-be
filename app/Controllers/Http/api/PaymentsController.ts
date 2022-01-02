// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Payment from "App/Models/Payment";

export default class PaymentsController {
  // 付款
  public async add({ request }: HttpContextContract) {
    const uid =  request.input("uid")
    const gid =  request.input("gid")
    const payment = new Payment()
    payment.uid = uid
    payment.gid = gid
    try{
      await Payment.create(payment)
      return {'data':"添加成功",'status':200,'code':0}
    }catch (error){
      return {'data':"添加失败",'status':201,'code':1}
    }
  }

  //分页查询
  public async all({ request }: HttpContextContract) {
    const uid =  request.input("uid")
    const pagenum =  request.input("pagenum")
    const pagesize =  request.input("pagesize")
    const Log = await Payment.query().where(uid).paginate(pagenum,pagesize)
    return {'Logs':Log,'status':200}
  }

}
