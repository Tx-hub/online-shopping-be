import RestResponse from "App/Common/RestResponse";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Payment from "App/Models/Payment";
import Database from "@ioc:Adonis/Lucid/Database";
import goodsController from "App/Controllers/Http/api/GoodsController";


export default class PaymentsController {

  // 添加账单
  public async add({ request }: HttpContextContract) {
    const uid = request.input("uid")
    const gid =  request.input("gid")
    const paynum =  request.input("paynum")
    const payment = new Payment()
    payment.uid = uid
    payment.gid = gid
    payment.paynum = paynum
    try{
      const trx = await Database.transaction()
      try {
        const gc = await new goodsController().sub(gid,paynum)
        if(gc.code !==0){
          return gc
        }
        await Payment.create(payment,trx)
        await trx.commit()
        return RestResponse.SUCCESS('',"购买成功")
      } catch (error) {
        await trx.rollback()
        return RestResponse.ERROR_SLEF("购买失败")
      }
    }catch (error){
      return RestResponse.ERROR_SLEF("购买失败")
    }
  }

  //付款查询
  public async all({ request }: HttpContextContract) {
    const uid =  request.input("params").uid
    try{
      const payment =  await Database
        .from('payments')
        .join('users', 'users.id', '=', uid)
        .join('goods', 'goods.id', '=', 'payments.gid')
        .select('users.username')
        .select('goods.name')
        .select('payments.paynum')
        .select('payments.created_at')
      return RestResponse.SUCCESS({"historylist":payment},"查询成功")
    }catch (Error){
      return RestResponse.DB_ERROR()
    }
  }

}
