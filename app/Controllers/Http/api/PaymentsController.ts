import RestResponse from "App/Common/RestResponse";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Payment from "App/Models/Payment";

export default class PaymentsController {

  // 添加账单
  public async add({ request }: HttpContextContract) {
    const uid =  request.input("uid")
    const gid =  request.input("gid")
    const payment = new Payment()
    payment.uid = uid
    payment.gid = gid
    try{
      await Payment.create(payment)
      return RestResponse.SUCCESS("","添加成功")
    }catch (error){
      return RestResponse.DB_ERROR()
    }
  }

  //分页查询
  public async all({ request }: HttpContextContract) {
    const uid =  request.input("uid")
    const pagenum =  request.input("pagenum")
    const pagesize =  request.input("pagesize")
    try{
      const payment = await Payment.query().where(uid).paginate(pagenum,pagesize)
      return RestResponse.SUCCESS({"payment":payment},"查询成功")
    }catch (Error){
      return RestResponse.DB_ERROR()
    }


  }

}
