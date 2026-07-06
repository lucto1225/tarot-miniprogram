var app = getApp()
var api = require('../../services/api.js')

Page({
  onLoad: function() {
    var today = new Date()
    var y = today.getFullYear()
    var m = String(today.getMonth() + 1).padStart(2, '0')
    var d = String(today.getDate()).padStart(2, '0')
    this.setData({ today: y + '-' + m + '-' + d })
  },

  data: {
    birthday: '',
    genderIndex: -1,
    gender: '',
    birthCity: '',
    question: '',
    genderOptions: ['男', '女'],
    today: '',
    submitting: false
  },

  // 生日
  onBirthdayChange: function(e) {
    this.setData({ birthday: e.detail.value })
  },

  // 性别
  onGenderChange: function(e) {
    var index = parseInt(e.detail.value)
    this.setData({
      genderIndex: index,
      gender: this.data.genderOptions[index]
    })
  },

  // 城市
  onCityInput: function(e) {
    this.setData({ birthCity: e.detail.value })
  },

  // 问题
  onQuestionInput: function(e) {
    this.setData({ question: e.detail.value })
  },

  // 提交
  onSubmit: function() {
    var birthday = this.data.birthday
    var gender = this.data.gender
    var question = this.data.question
    var birthCity = this.data.birthCity || '未知'

    if (!birthday || !gender || !question.trim()) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }

    // 保存到全局
    app.globalData.reading = {
      birthday: birthday,
      gender: gender,
      birthCity: birthCity,
      question: question.trim()
    }

    // 显示加载，调用 workflow 匹配牌阵
    this.setData({ submitting: true })
    wx.showLoading({ title: '匹配牌阵中...', mask: true })

    var self = this
    api.matchSpread({
      birthday: birthday,
      city: birthCity,
      sex: gender,
      query: question.trim()
    }).then(function(result) {
      wx.hideLoading()
      self.setData({ submitting: false })
      // 将 workflow 返回的牌阵信息存入 globalData
      app.globalData.reading.workflowSpread = result
      wx.navigateTo({ url: '/pages/spread/spread' })
    }).catch(function(err) {
      wx.hideLoading()
      self.setData({ submitting: false })
      console.error('Workflow 调用失败，使用本地匹配:', err)
      // 兜底：使用本地关键词匹配
      wx.navigateTo({ url: '/pages/spread/spread' })
    })
  }
})
