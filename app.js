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

  onLaunch() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
        if (res.code) {
          this.globalData.loginCode = res.code
        }
      }
    })
  }
})
