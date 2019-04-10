//http 
const config = require('../config/config.js');
const media = require('../utils/media.js');
const app = getApp();

//base http 
const http = ({
  url = '',
  method = {},
  data = {},
  header = {} //default contentType -> application/json;charset=UTF-8
} = {}) => {

  let timeStart = Date.now();

  //promis
  return new Promise((resolve, reject) => {
    wx.request({
      url: getURL(url),
      data,
      method,
      header,
      complete: (res) => {
        console.log('[HTTP] >>>');
        console.log('[HTTP url] : ' + getURL(url));
        console.log("[HTTP method] : " + JSON.stringify(method));
        console.log("[HTTP data] : " + JSON.stringify(data));
        console.log("[HTTP header] : " + JSON.stringify(header));
        console.log(`[HTTP time] : ${Date.now() - timeStart} ms`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('[HTTP] <<<');
          // console.log('[HTTP result] : ' + JSON.stringify(res))
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}

const get = (url, data, header) => {
  return http({
    url,
    method: 'get',
    data: data,
  })
}

const post = (url, data, header) => {
  return http({
    url,
    method: 'post',
    data,
    header
  })
}

const put = (url, data, header) => {
  return http({
    url,
    method: 'put',
    data,
    header
  })
}

const del = (url, data, header) => {
  return http({
    url,
    method: 'delete',
    data,
    header
  })
}
//access + xxx-form method 
const access = {
  access_token: app.globalData.access_token
}

//register
const register = (url, data) => {
  return http({
    url,
    method: 'post',
    data,
    header: {
      register_token: app.globalData.register_token,
      kaptcha: app.globalData.kaptcha
    }
  })
}

const getURL = (url) => {
  return config.host + url;
}

/**
 * 验证请求返回function：这里根据你后台的返回结果bean 进行处理
 */
var resHandler = (res, callBackFun) => {
  if (res.data) {
    // if (res.data.ret == 1) {
    //   callBackFun(res.data.data);
    //   return;
    // }
    callBackFun(res.data);
    return;
  }
  wx.showToast({
    title: '请求错误，请重试',
    icon: 'none',
    duration: 2000
  })
}

/**
 * 合并属性
 */
const extend = (target, source) => {
  for (var obj in source) {
    target[obj] = source[obj];
  }
  return target;
}

module.exports = {
  //base form
  get: get,
  post: post,
  del: del,
  put: put,
  //register 
  register: register,
  //resHandler
  resHandler: resHandler
}