var auth = require('../../services/auth.js')
var util = require('../../utils/util.js')

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: ''
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname')
  },

  onLoad() {
    const saved = auth.getUserInfo()
    if (saved) {
      this.setData({ userInfo: saved, hasUserInfo: true })
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({ 'userInfo.avatarUrl': avatarUrl })
    this.checkUserInfo()
  },

  onInputChange(e) {
    this.setData({ 'userInfo.nickName': e.detail.value })
    this.checkUserInfo()
  },

  checkUserInfo() {
    const { avatarUrl, nickName } = this.data.userInfo
    const hasUserInfo = !!(nickName && avatarUrl && avatarUrl !== defaultAvatarUrl)
    this.setData({ hasUserInfo })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于展示个人头像和昵称',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.doLogin(res.userInfo)
      }
    })
  },

  onStartReading() {
    const { userInfo } = this.data
    auth.setUserInfo(userInfo)

    const app = getApp()
    app.globalData.userInfo = userInfo

    // wx.login 异步获取 code（不阻塞页面跳转）
    auth.wxLogin().then(code => {
      app.globalData.loginCode = code
    }).catch(err => {
      util.logError('wx.login 失败（非阻塞）:', err)
    })

    wx.navigateTo({ url: '/pages/input/input' })
  }
})
