App({
  globalData: {
    userInfo: null,
    openId: null,
    loginCode: null,
    reading: {
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
  },

  onLaunch: function() {
    wx.login({
      success: function(res) {
        if (res.code) {
          this.globalData.loginCode = res.code
        }
      }.bind(this)
    })
  }
})
