

export default class RestResponse  {


  static SUCCESS (data,msg){
    return { 'data': data, 'code': 0, 'msg':msg }
  }

  static ERROR(){
    return { 'data': '', 'code': 1, 'msg':"未知错误" }
  }

  static ERROR_SLEF(msg){
    return { 'data': '', 'code': 1, 'msg':msg }
  }

  static Login_ERROR(){
    return { 'data': '', 'code': 10001, 'msg':"账号或密码错误" }
  }
  static Register_ERROR(){
    return { 'data': '', 'code': 10002, 'msg':"账号或密码错误" }
  }

  static DB_ERROR(){
    return { 'data': '', 'code': 20001, 'msg':"数据库错误" }
  }

  static REDIS_ERROR(){
    return { 'data': '', 'code': 20002, 'msg':"REDIS错误" }
  }

  static Params_ERROR(){
    return { 'data': '', 'code': 10001, 'msg':"参数错误" }
  }

}

