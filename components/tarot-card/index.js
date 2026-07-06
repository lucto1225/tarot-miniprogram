Component({
  properties: {
    card: {
      type: Object,
      value: null
    },
    position: {
      type: String,
      value: ''
    },
    revealed: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: 'normal' // small | normal | large
    }
  },

  data: {
    sizeClass: ''
  },

  observers: {
    'size': function(size) {
      this.setData({ sizeClass: `card-${size}` })
    }
  }
})
