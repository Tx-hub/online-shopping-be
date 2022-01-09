/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// var sca = function() {
//
// export default class  service{
//   public async receiver(text){
//     server.connections.forEach((conn) => {
//       conn.sendText(text);
//     })
//   }
// }


Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

//商品
Route.get('api/goods/:id', 'api/GoodsController.show').middleware("auth:api");
Route.get('api/goods/', 'api/GoodsController.all'). as('shop.index').middleware("auth:api");
Route.post('api/goods/show_by_name', 'api/GoodsController.show_by_name').middleware("auth:api");
Route.post('api/goods/add', 'api/GoodsController.add').middleware("auth:api");
Route.post('api/goods/sub', 'api/GoodsController.sub').middleware("auth:api");

//用户
Route.post('user/create','UsersController.create')
Route.get('register', 'api/AuthController.registerShow').as('auth.register.show')
Route.post('api/register', 'api/AuthController.register').as('auth.register')
Route.get('login', 'api/AuthController.loginShow').as('auth.login.show')
Route.post('api/login', 'api/AuthController.login').as('auth.login')
Route.get('logout', 'api/AuthController.logout').as('auth.logout')

//日志
Route.post('api/logs/add' ,'api/LogsController.add').middleware("auth:api");


//付款
Route.post('api/payment/add', 'api/PaymentsController.add').middleware("auth:api");
Route.post('api/payment/all', 'api/PaymentsController.all').middleware("auth:api");

//websocket
Route.post('api/signup/send','api/OrdersController.send').middleware("auth:api");
// Route.post('api/signup/receive','api/OrdersController.receive')
// Route.post('api/signup/receiver','api/OrdersController.receiver')
Route.post('api/signup/server_register','api/OrdersController.server_register')
// Route.group(() => {
// Route.post('api/register', 'api/AuthController.register').as('auth.register')
// Route.get('login', 'api/AuthController.loginShow').as('auth.login.show')
// Route.post('api/login', 'api/AuthController.login').as('auth.login')
// Route.get('logout', 'api/AuthController.logout').as('auth.logout')
// }).middleware("auth:api");
// }).prefix("api");
