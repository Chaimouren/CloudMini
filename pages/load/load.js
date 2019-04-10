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
    http.get('https://www.baidu.com')
      .then(res =>{
        http.resHandler(res,function(data){
          console.log(data);
        })
      })
  },
})