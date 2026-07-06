var app = getApp()
var spreads = require('../../data/spreads.js')

Page({
  data: {
    spread: null,
    question: '',
    loading: true
  },

  onLoad: function() {
    try {
      var reading = app.globalData.reading
      var question = (reading && reading.question) ? reading.question : ''
      var workflowSpread = reading ? reading.workflowSpread : null

      console.log('spread page onLoad, question:', question)
      console.log('workflowSpread:', JSON.stringify(workflowSpread))

      // 优先使用 workflow 返回的牌阵，否则本地匹配
      var wf = workflowSpread
      if (wf && (wf.spread_name || wf.name || wf.output)) {
        // workflow output 字段可能命名为 spread_name / name / output
        var wfName = wf.spread_name || wf.name || (typeof wf.output === 'string' ? wf.output : '')
        var wfCount = wf.card_count || wf.count || wf.num || 3
        var wfDesc = wf.description || wf.desc || ''
        var wfPositions = wf.positions || wf.position_list || []
        this.setData({
          spread: {
            id: wf.spread_id || 'workflow',
            name: wfName,
            card_count: wfCount,
            description: wfDesc,
            positions: wfPositions,
            fromWorkflow: true
          },
          question: question,
          loading: false
        })
      } else {
        var matched = this.matchSpread(question)
        console.log('local matched spread:', matched.name)
        this.setData({ spread: matched, question: question, loading: false })
      }
    } catch (e) {
      console.error('spread page onLoad error:', e)
      // 最终兜底
      var fallback = spreads[0]
      this.setData({ spread: fallback, question: '', loading: false })
    }
  },

  matchSpread: function(question) {
    if (!question) return spreads[0]
    for (var i = 0; i < spreads.length; i++) {
      var spread = spreads[i]
      for (var j = 0; j < spread.suitable_for.length; j++) {
        if (question.indexOf(spread.suitable_for[j]) !== -1) {
          return spread
        }
      }
    }
    return spreads[0]
  },

  onConfirm: function() {
    var spread = this.data.spread
    if (!spread) {
      wx.showToast({ title: '牌阵加载失败，请返回重试', icon: 'none' })
      return
    }

    console.log('onConfirm, spreadId:', spread.id, 'spreadName:', spread.name)

    app.globalData.reading.spreadId = spread.id
    app.globalData.reading.spreadName = spread.name
    app.globalData.reading.spreadCardCount = spread.card_count
    app.globalData.reading.spreadPositions = spread.positions

    wx.navigateTo({
      url: '/pages/draw/draw',
      fail: function(err) {
        console.error('navigateTo draw failed:', err)
        wx.showToast({ title: '页面跳转失败', icon: 'none' })
      }
    })
  },

  onBack: function() {
    wx.navigateBack()
  }
})
