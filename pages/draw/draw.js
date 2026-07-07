var app = getApp()
var cardsData = require('../../data/cards.js')

Page({
  data: {
    spread: null,
    allCards: [],
    selectedCards: [],
    dotArray: [],
    phase: 'shuffle'
  },

  onLoad: function() {
    var reading = app.globalData.reading
    var spreadName = reading.spreadName || '通用牌阵'
    var cardCount = reading.spreadCardCount || 3

    // 直接从 globalData 读取牌阵信息（兼容 workflow 和本地）
    var spread = {
      name: spreadName,
      card_count: cardCount,
      positions: reading.spreadPositions || []
    }

    var dotArray = []
    for (var i = 0; i < cardCount; i++) {
      dotArray.push(i)
    }

    this.setData({ spread: spread, dotArray: dotArray })
    this.shuffleCards()
  },

  shuffleCards: function() {
    this.setData({ isShuffling: true, selectedCards: [], phase: 'shuffle' })

    var shuffled = cardsData.map(function(c) {
      var copy = {}
      for (var key in c) { copy[key] = c[key] }
      copy.selected = false
      return copy
    })

    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var tmp = shuffled[i]
      shuffled[i] = shuffled[j]
      shuffled[j] = tmp
    }

    var self = this
    setTimeout(function() {
      self.setData({ allCards: shuffled, phase: 'select' })
    }, 1200)
  },

  onSelectCard: function(e) {
    if (this.data.phase !== 'select') return

    var index = e.currentTarget.dataset.index
    var allCards = this.data.allCards
    var card = allCards[index]
    var maxCount = this.data.spread.card_count

    if (card.selected) return
    if (this.data.selectedCards.length >= maxCount) return

    // 随机正逆位
    var isReversed = Math.random() < 0.5
    allCards[index] = Object.assign({}, card, { selected: true, reversed: isReversed })
    var selectedCards = this.data.selectedCards.concat(Object.assign({}, card, { reversed: isReversed }))

    this.setData({ allCards: allCards, selectedCards: selectedCards })

    wx.vibrateShort({ type: 'light' })

    if (selectedCards.length === maxCount) {
      this.setData({ phase: 'done' })
      // 存储卡牌 id + 正逆位
      app.globalData.reading.cards = selectedCards.map(function(c) {
        return { id: c.id, reversed: c.reversed }
      })

      var self = this
      setTimeout(function() {
        wx.navigateTo({ url: '/pages/result/result' })
      }, 1000)
    }
  },

  onReshuffle: function() {
    this.shuffleCards()
  }
})
