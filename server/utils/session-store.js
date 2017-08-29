/**
 * session 存储类
 * koa-session2 只提供了 session 存储接口，想要把 session 存储到 mongodb 中
 * 需要自定义 mongoose 存储 session 类
 */

// 导入 Session model
var Session = require('../models/session')
const { Store } = require("koa-session2")

class SessionStore extends Store {
  constructor() {
    super()
  }

  /**
   * 根据 sid 读取 session 内容，
   * @param sid seesionid
   */
  async get(sid) {
    let data = await Session.findOne({ sid: sid }).exec()
      .then(function (data) {
        if (data) {
          return data.session
        } else {
          return null
        }
      })

    return JSON.parse(data)
  }

  /**
   * 添加或者更新 seesion 内容
   * 首先根据 sid 读取 session 内容，如果读取到则更新 seesion 内容，
   * 如果没有读取到则添加 session 内容
   * @param session 具体内容
   * @return sid
   */
  async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}) {
    var session = JSON.stringify(session)
    try {
      await Session.findOne({ sid: sid }, 'session').exec()
        .then(function (s) {
          if (s) {
            Session.update({ sid: sid }, { $set: { session: session }}).exec()
          } else {
            var newSession = new Session({
              sid: sid,
              session: session
            })
            newSession.save()
          }
        })
    } catch (e) {}

    return sid
  }

  /**
   * 根据 sid 销毁删除 session 内容
   * @param sid seesion id
   */
  async destroy(sid) {
    return await Session.deleteOne({ sid: sid })
  }
}

module.exports = SessionStore
