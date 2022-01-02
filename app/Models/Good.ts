import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Good extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public price:Float32Array

  @column()
  public total: number

  @column()
  public describe: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
