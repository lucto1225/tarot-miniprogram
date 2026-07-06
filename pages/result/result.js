const app = getApp()
const cardsData = require('../../data/cards.js')
const spreads = require('../../data/spreads.js')
const api = require('../../services/api.js')

Page({
  data: {
    spread: null,
    selectedCards: [],
    positions: [],
    reading: null,
    loading: true
  },

  onLoad() {
    const reading = app.globalData.reading
    const spread = spreads.find(s => s.id === reading.spreadId)
    const selectedCards = reading.cards.map(id => cardsData.find(c => c.id === id))

    // 牌与位置一一对应
    const positions = spread.positions.map((pos, i) => ({
      ...pos,
      card: selectedCards[i] || null
    }))

    this.setData({ spread, selectedCards, positions })

    // 调用 Coze workflow 获取 AI 解读
    this.fetchReading()
  },

  async fetchReading() {
    try {
      const res = await api.tarotDivination({
        birthday: app.globalData.reading.birthday,
        gender: app.globalData.reading.gender,
        birthCity: app.globalData.reading.birthCity,
        question: app.globalData.reading.question,
        spreadId: app.globalData.reading.spreadId,
        spreadName: app.globalData.reading.spreadName,
        cards: app.globalData.reading.cards,
        positions: this.data.positions.map(p => ({
          name: p.name,
          meaning: p.meaning,
          cardId: p.card ? p.card.id : null
        }))
      })

      this.setData({ reading: res, loading: false })
    } catch (err) {
      console.error('AI 解读失败:', err)
      this.setData({ loading: false })
      wx.showToast({ title: '解读失败，请重试', icon: 'none' })
    }
  },

  onRestart() {
    app.globalData.reading = {
      birthday: '',
      gender: '',
      birthCity: '',
      question: '',
      spreadId: null,
      spreadName: '',
      cards: [],
      result: null
    }
    wx.reLaunch({ url: '/pages/index/index' })
  }
})
