const app = getApp()
const cardsData = require('../../data/cards.js')
const spreads = require('../../data/spreads.js')

Page({
  data: {
    spread: null,
    allCards: [],
    selectedCards: [],
    isShuffling: false,
    phase: 'shuffle' // shuffle | select | done
  },

  onLoad() {
    const { spreadId } = app.globalData.reading
    const spread = spreads.find(s => s.id === spreadId)
    this.setData({ spread })

    // 初始化 78 张牌并洗牌
    this.shuffleCards()
  },

  shuffleCards() {
    this.setData({ isShuffling: true, selectedCards: [], phase: 'shuffle' })

    // Fisher-Yates 洗牌
    const shuffled = [...cardsData]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setTimeout(() => {
      this.setData({ allCards: shuffled, isShuffling: false, phase: 'select' })
    }, 1000)
  },

  onSelectCard(e) {
    const { index } = e.currentTarget.dataset
    const card = this.data.allCards[index]

    if (this.data.selectedCards.includes(card)) return
    if (this.data.selectedCards.length >= this.data.spread.card_count) return

    const selectedCards = [...this.data.selectedCards, card]
    this.setData({ selectedCards })

    if (selectedCards.length === this.data.spread.card_count) {
      this.setData({ phase: 'done' })

      app.globalData.reading.cards = selectedCards.map(c => c.id)

      setTimeout(() => {
        wx.navigateTo({ url: '/pages/result/result' })
      }, 800)
    }
  },

  onReshuffle() {
    this.shuffleCards()
  }
})
