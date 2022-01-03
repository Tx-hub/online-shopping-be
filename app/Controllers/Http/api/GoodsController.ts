// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Goods from "App/Models/Good"
import RestResponse from "App/Common/RestResponse";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";



export default class GoodsController {

  //test
  public async index({view}) {
    const good = await Goods.all()
    return view.render('shop',{
      goods: good
    })
  }

  //减少库存
  public async sub({ request }: HttpContextContract ){
    const gid =  request.input('gid')
    try{
      const good = await Goods.findOrFail(gid)
      if(good.total<1){
        return RestResponse.ERROR_SLEF("库存不足")
      }
      good.total =  good.total - 1
      good.save()
      return RestResponse.SUCCESS("","减少库存成功")
    }catch (Error){
      return RestResponse.DB_ERROR()
    }
  }

  // 添加商品
  public async add({ request }: HttpContextContract) {
    const name =  request.input("name")
    const price =  request.input("price")
    const total =  request.input("total")
    const describe =  request.input("describe")
    const good = new Goods()
    good.name = name
    good.price = price
    good.total = total
    good.describe = describe
    try{
      await Goods.create(good)
      return RestResponse.SUCCESS("","添加成功")
    }catch (error){
      return RestResponse.ERROR_SLEF('添加失败')
    }
  }

  //分页查询
  public async all({ request }: HttpContextContract) {
    const query =  request.input("query")
    const pagenum =  request.input("pagenum")
    const pagesize =  request.input("pagesize")
    try{
      const good = await Goods.query().where("name","like",query+"%").paginate(pagenum,pagesize)
      return RestResponse.SUCCESS({'goods':good},'查询成功')
    }catch (Error){
      return RestResponse.DB_ERROR()
    }
  }

  //test
  public async show({ params }: HttpContextContract) {
    return params
    const good = await Goods.find(params.id)
    return good
  }

  //test
  public async show_by_name({ request }: HttpContextContract){
    const name = request.only(["name"]).name
    const good = await Goods.query().where("name","like","%"+name+"%")
    return good
  }

}


