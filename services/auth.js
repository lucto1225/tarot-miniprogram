// 微信登录封装

var app = getApp()
var util = require('../utils/util.js')

/**
 * 微信登录 - 获取 code
 * @returns {Promise<string>} login code
 */
function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          resolve(res.code)
        } else {
          reject(new Error('wx.login 未返回 code'))
        }
      },
      fail: (err) => {
        util.logError('wx.login 失败:', err)
        reject(err)
      }
    })
  })
}

/**
 * 获取用户信息（新版头像昵称填写方式）
 * 微信新版规定：通过 <button open-type="chooseAvatar"> + <input type="nickname"> 获取
 * 本函数在页面中选择头像和填写昵称后调用，保存到 globalData
 * @param {Object} userInfo - { avatarUrl, nickName }
 */
function setUserInfo(userInfo) {
  app.globalData.userInfo = userInfo
  wx.setStorageSync('userInfo', userInfo)
}

/**
 * 从本地恢复用户信息
 * @returns {Object|null}
 */
function getUserInfo() {
  if (!app.globalData.userInfo) {
    app.globalData.userInfo = wx.getStorageSync('userInfo') || null
  }
  return app.globalData.userInfo
}

/**
 * 检查是否已登录
 * @returns {boolean}
 */
function isLoggedIn() {
  return !!getUserInfo()
}

module.exports = {
  wxLogin,
  setUserInfo,
  getUserInfo,
  isLoggedIn
}
