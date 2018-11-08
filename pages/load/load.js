// pages/load/load.js

import date from '../../utils/date.js';
import http from '../../utils/http.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(date.getDate());
    http.xget('/api/dept/queryForTree')
      .then(res => {
        console.log(res)
      })
  },
})