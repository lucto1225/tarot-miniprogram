const auth = require('../../services/auth.js')

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
    this.doLogin(userInfo)
  },

  async doLogin(userInfo) {
    try {
      const code = await auth.wxLogin()
      const app = getApp()
      app.globalData.loginCode = code
      app.globalData.userInfo = userInfo

      wx.navigateTo({ url: '/pages/input/input' })
    } catch (err) {
      console.error('登录失败:', err)
      wx.showToast({ title: '登录失败，请重试', icon: 'none' })
    }
  }
})
