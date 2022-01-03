import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User";
import RestResponse from "App/Common/RestResponse";

export default class AuthController {
  //test
  public async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  //注册
  public async register({ request, auth }: HttpContextContract) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email', caseInsensitive: true })]),
      password: schema.string({}, [rules.minLength(8)])
    })
    const data = await request.validate({ schema: userSchema })
    try{
      const user = await User.create(data)
      const response =await auth.use('api').login(user)
      return RestResponse.SUCCESS({"response":response, "user": user},"注册成功")
    }catch (Error){
      return RestResponse.Register_ERROR()
    }

  }

  //test
  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  //登陆
  public async login({ request, auth }: HttpContextContract) {
    const { uid, password } = request.only(['uid', 'password'])
    try {
      const response = await auth.use('api').attempt(uid, password)
      const user = await auth.use('api').user
      return RestResponse.SUCCESS({"response": response, "user": user}, "登陆成功")
    }
     catch (error) {
      return RestResponse.Login_ERROR()
    }finally {
      return RestResponse.ERROR()
    }
  }

  public async logout({ auth }: HttpContextContract) {
    try{
      await auth.logout()
      return RestResponse.SUCCESS('','退出成功')
    }catch (Error){
      return RestResponse.ERROR_SLEF('退出登陆失败')
    }
    finally {
      return RestResponse.ERROR()
    }

  }
}
