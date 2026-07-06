var app = getApp()
var cardsData = require('../../data/cards.js')
var api = require('../../services/api.js')
var util = require('../../utils/util.js')

// CDN 图片基础 URL
var IMG_BASE = 'https://data.totl.net/tarot-rwcs-images'

/**
 * 根据卡牌 id 获取图片 URL
 */
function getCardImage(card) {
  if (!card) return ''
  var suit = card.suit
  var filename = ''
  if (card.type === 'major') {
    var n = card.arcana < 10 ? '0' + card.arcana : '' + card.arcana
    filename = 'm' + n + '.jpg'
  } else if (suit === 'cups') {
    filename = 'c' + pad(card.id - 21) + '.jpg'
  } else if (suit === 'swords') {
    filename = 's' + pad(card.id - 35) + '.jpg'
  } else if (suit === 'wands') {
    filename = 'w' + pad(card.id - 49) + '.jpg'
  } else if (suit === 'pentacles') {
    filename = 'p' + pad(card.id - 63) + '.jpg'
  }
  return IMG_BASE + '/' + filename
}

function pad(n) {
  return n < 10 ? '0' + n : '' + n
}

Page({
  data: {
    positions: [],
    reading: null,
    loading: true,
    errorMsg: ''
  },

  onLoad: function() {
    var reading = app.globalData.reading
    var positions = []
    var spreadPositions = reading.spreadPositions || []
    var cards = reading.cards || []

    for (var i = 0; i < cards.length; i++) {
      var card = cardsData.find(function(c) { return c.id === cards[i] })
      var pos = spreadPositions[i] || { name: '牌' + (i + 1), meaning: '' }
      positions.push({
        name: pos.name || ('牌' + (i + 1)),
        meaning: pos.meaning || '',
        card: card ? {
          id: card.id,
          name_zh: card.name_zh,
          name_en: card.name_en,
          keywordsStr: card.keywords ? card.keywords.join(' · ') : '',
          meaning_upright: card.meaning_upright || '',
          imageUrl: getCardImage(card)
        } : null
      })
    }

    this.setData({ positions: positions })
    this.fetchReading()
  },

  fetchReading: function() {
    var self = this
    var reading = app.globalData.reading
    var cardCount = reading.cards ? reading.cards.length : (reading.spreadCardCount || 3)

    api.getReading({
      birthday: reading.birthday,
      city: reading.birthCity,
      sex: reading.gender,
      query: reading.question,
      num: cardCount
    }).then(function(res) {
      console.log('workflow raw response:', JSON.stringify(res))

      var readingData = {}

      // 处理 output 字段（纯文本 Markdown）
      if (res.output && typeof res.output === 'string') {
        readingData.summaryHtml = util.markdownToHtml(res.output)
      }

      // 处理结构化 interpretations
      if (res.interpretations && res.interpretations.length) {
        readingData.interpretations = res.interpretations.map(function(item) {
          return {
            position: item.position || item.card_name || '',
            card_name: item.card_name || '',
            interpretation: item.interpretation || item.desc || item.content || '',
            interpretationHtml: util.markdownToHtml(item.interpretation || item.desc || item.content || '')
          }
        })
      }

      // 处理 summary 字段
      if (res.summary && typeof res.summary === 'string') {
        readingData.summaryHtml = util.markdownToHtml(res.summary)
      }

      // 兜底
      if (!readingData.summaryHtml && !readingData.interpretations) {
        readingData.summaryHtml = util.markdownToHtml(typeof res === 'string' ? res : JSON.stringify(res))
      }

      self.setData({ reading: readingData, loading: false })
    }).catch(function(err) {
      console.error('AI 解读失败:', err)
      self.setData({
        loading: false,
        errorMsg: err.message || '网络请求失败'
      })
    })
  },

  onRestart: function() {
    app.globalData.reading = {
      birthday: '',
      gender: '',
      birthCity: '',
      question: '',
      spreadId: null,
      spreadName: '',
      spreadCardCount: 0,
      spreadPositions: [],
      cards: [],
      result: null,
      workflowSpread: null
    }
    wx.reLaunch({ url: '/pages/index/index' })
  }
})
