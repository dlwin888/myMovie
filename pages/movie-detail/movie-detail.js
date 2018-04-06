// pages/movie-detail/movie-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options

    wx.showLoading({
      title: '',
    })

    wx.request({
      url: 'https://db.miaov.com/doubanapi/v0/movie/detail/' + id,
      success: (res)=>{
        const movie = res.data.data

        this.setData({movie: movie})

        wx.hideLoading()
      }
    })
  }
})