var app = getApp()
var spreads = require('../../data/spreads.js')
var util = require('../../utils/util.js')

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

  onBirthdayChange: function(e) {
    this.setData({ birthday: e.detail.value })
  },

  onGenderChange: function(e) {
    var index = parseInt(e.detail.value)
    this.setData({
      genderIndex: index,
      gender: this.data.genderOptions[index]
    })
  },

  onCityInput: function(e) {
    this.setData({ birthCity: e.detail.value })
  },

  onQuestionInput: function(e) {
    this.setData({ question: e.detail.value })
  },

  // 本地关键词匹配牌阵
  matchSpreadLocal: function(question) {
    if (!question) return this.getFallback()
    for (var i = 0; i < spreads.length; i++) {
      var spread = spreads[i]
      for (var j = 0; j < spread.suitable_for.length; j++) {
        if (question.indexOf(spread.suitable_for[j]) !== -1) {
          return spread
        }
      }
    }
    return this.getFallback()
  },

  getFallback: function() {
    for (var k = 0; k < spreads.length; k++) {
      if (spreads[k].id === 'golden_triangle') return spreads[k]
    }
    return spreads[spreads.length - 1]
  },

  onSubmit: function() {
    var birthday = this.data.birthday
    var gender = this.data.gender
    var question = this.data.question.trim()
    var birthCity = this.data.birthCity || '未知'

    if (!birthday || !gender || !question) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }

    // 1. 本地匹配牌阵 → 确定 num
    var matched = this.matchSpreadLocal(question)
    var num = matched.card_count
    util.log('本地匹配牌阵:', matched.name, '卡牌数:', num)

    // 2. 保存到全局
    app.globalData.reading = {
      birthday: birthday,
      gender: gender,
      birthCity: birthCity,
      question: question,
      spreadId: matched.id,
      spreadName: matched.name,
      spreadCardCount: num,
      spreadPositions: matched.positions
    }

    // 3. 跳转牌阵展示页（workflow 调用在抽牌完成后的结果页触发）
    wx.navigateTo({ url: '/pages/spread/spread' })
  }
})
