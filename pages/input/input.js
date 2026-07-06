const app = getApp()

Page({
  data: {
    birthday: '',
    gender: '',
    birthCity: '',
    question: '',
    genderOptions: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ]
  },

  onBirthdayChange(e) {
    this.setData({ birthday: e.detail.value })
  },

  onGenderChange(e) {
    this.setData({ gender: e.detail })
  },

  onCityChange(e) {
    this.setData({ birthCity: e.detail.value })
  },

  onQuestionInput(e) {
    this.setData({ question: e.detail.value })
  },

  onSubmit() {
    const { birthday, gender, birthCity, question } = this.data

    if (!birthday || !gender || !question) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' })
      return
    }

    app.globalData.reading = { birthday, gender, birthCity, question }

    wx.navigateTo({ url: '/pages/spread/spread' })
  }
})
