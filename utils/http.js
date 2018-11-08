//http 
const config = require('../config/config.js');
const app = getApp();

//base http 
const http = ({
  url = '',
  method = {},
  data = {},
  header = {} //default content application/json;charset=UTF-8
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
        //打印 堆栈
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
    header
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

//method delete content can't be xxxform
const xxxform = {
  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

const xget = (url, data) => {
  return http({
    url,
    method: 'get',
    data,
    header: xxxform
  })
}
const xpost = (url, data) => {
  return http({
    url,
    method: 'post',
    data,
    header: xxxform
  })
}
const xput = (url, data) => {
  return http({
    url,
    method: 'put',
    data,
    header: xxxform
  })
}

//access + xxx-form method 
const access = {
  access_token: app.globalData.access_token
}

const axget = (url, data) => {
  return http({
    url,
    method: 'get',
    data,
    header: extend(xxxform, access)
  })
}
const axpost = (url, data) => {
  return http({
    url,
    method: 'post',
    data,
    header: extend(xxxform, access)
  })
}
const axput = (url, data) => {
  return http({
    url,
    method: 'put',
    data,
    header: extend(xxxform, access)
  })
}

//access json method
const ajget = (url, data) => {
  return http({
    url,
    method: 'get',
    data,
    header: access
  })
}

const ajpost = (url, data) => {
  return http({
    url,
    method: 'post',
    data,
    header: access
  })
}

const ajput = (url, data) => {
  return http({
    url,
    method: 'put',
    data,
    header: access
  })
}

const ajdel = (url, data) => {
  return http({
    url,
    method: 'delete',
    data,
    header: access
  })
}

//register
const register = {
  register_token: app.globalData.register_token,
  kaptcha: app.globalData.kaptcha
}

const regpost = (url, data) => {
  return http({
    url,
    method: 'post',
    data,
    register
  })
}


const getURL = (url) => {
  return config.host + url;
}

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
  //xxxform
  xget: xget,
  xpost: xpost,
  xput: xput,
  //access xxx-form
  axget: axget,
  axpost: axpost,
  axput: axput,
  //access json
  ajget: ajget,
  ajpost: ajpost,
  ajdel: ajdel,
  ajput: ajput,
  //register 
  regpost: regpost
}