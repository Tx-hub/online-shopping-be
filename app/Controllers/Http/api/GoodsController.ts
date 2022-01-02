// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Goods from "App/Models/Good"

import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";



export default class GoodsController {

  public async index({view}) {
    const good = await Goods.all()
    return view.render('shop',{
      goods: good
    })
  }
  
  public async sub({ request }: HttpContextContract ){
    const gid =  request.input('gid')
    const good = await Goods.findOrFail(gid)
    if(good.total<1){
      return {"data":"库存不足","status":200,"code":1}
    }
    good.total =  good.total - 1
    good.save()
    return {"data":"库存-1","status":200,"code":0}
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
      return {'data':"添加成功",'status':200, "code":0}
    }catch (error){
      return {'data':"添加失败",'status':201, "code":1}
    }
  }

  //分页查询
  public async all({ request }: HttpContextContract) {
    const query =  request.input("query")
    const pagenum =  request.input("pagenum")
    const pagesize =  request.input("pagesize")
    const good = await Goods.query().where("name","like",query+"%").paginate(pagenum,pagesize)
    return {'goods':good,'status':200,"code":0}
  }

  public async show({ params }: HttpContextContract) {
    return params
    const good = await Goods.find(params.id)
    return good
  }

  public async show_by_name({ request }: HttpContextContract){
    const name = request.only(["name"]).name
    const good = await Goods.query().where("name","like","%"+name+"%")
    return good
  }

}


