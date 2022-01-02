import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User";


export default class AuthController {
  public async registerShow({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, auth }: HttpContextContract) {
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email', caseInsensitive: true })]),
      password: schema.string({}, [rules.minLength(8)])
    })
    const data = await request.validate({ schema: userSchema })
    const user = await User.create(data)
    const response =await auth.use('api').login(user)
    return {"data": {"response":response, "user": user}, "status": 200,"code":0}
  }

  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { uid, password } = request.only(['uid', 'password'])
    try {
      const response = await auth.use('api').attempt(uid, password)
      const user = await auth.use('api').user
      return {"data": {"response":response, "user": user}, "status": 200,"code":0}
    } catch (error) {
      return {status:403,data:"密码错误"}
    }
    return response.redirect('/')
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.redirect().toRoute('auth.login.show')
  }
}
