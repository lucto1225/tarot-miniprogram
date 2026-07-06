const app = getApp()
const spreads = require('../../data/spreads.js')

Page({
  data: {
    spread: null,
    loading: true
  },

  onLoad() {
    const { question } = app.globalData.reading
    const matched = this.matchSpread(question)
    this.setData({ spread: matched, loading: false })
  },

  matchSpread(question) {
    const q = question.toLowerCase()

    for (const spread of spreads) {
      for (const keyword of spread.suitable_for) {
        if (q.includes(keyword)) {
          return spread
        }
      }
    }

    // 默认使用通用牌阵（第 0 个）
    return spreads[0]
  },

  onConfirm() {
    const { spread } = this.data
    app.globalData.reading.spreadId = spread.id
    app.globalData.reading.spreadName = spread.name
    wx.navigateTo({ url: '/pages/draw/draw' })
  },

  onBack() {
    wx.navigateBack()
  }
})
