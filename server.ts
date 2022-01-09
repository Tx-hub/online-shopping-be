/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname)
  .httpServer()
  .start()
// console.log(1)
// var ws = require('nodejs-websocket');
// var server = ws.createServer()
// var i = 0
// console.log(i)
// if(i==0){
//   server.listen(3000)
//   i++;
// }

// try{
//   var ws = require('nodejs-websocket');
//   var server = ws.createServer()
//   server.listen(3000)
// }catch (Error){
//   console.log("111")
// }

