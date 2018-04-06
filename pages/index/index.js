// index.js
import cfg from '../../common/config/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    page: 1,
    size: 6,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovies()
  },
  saveData(data) {
    let history = wx.getStorageSync('history') || []

    history = history.filter((item) => {
      return item._id !== data._id
    })

    history.unshift(data)
    wx.setStorageSync('history', history)
  },
  loadMovies() {
    const { size, page, movies } = this.data
    this.setData({ loading: true })
    wx.request({
      url: `${cfg.domain}/list?base=true&page=${page}&size=${size}`,
      success: (res) => {
        const { data } = res.data
        for (let i = 0; i < data.length; i += 2) {
          movies.push([data[i], data[i + 1] ? data[i + 1] : null])
        }
        this.setData({ movies: movies, loading: false })
      }
    })
  },
  lowerHandler() {
    const { page } = this.data
    this.setData({ page: page + 1 })
    this.loadMovies()
  },
  goToDetailHandler(e){
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData
    this.saveData(movieData)
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + _id,
    })
  }
})