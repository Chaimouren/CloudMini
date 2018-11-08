//date util

//yyyy-MM-dd
const getDate = () => {
  var date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//yyyy-MM-dd HH:mm:ss
const getDateDetail = () => {
  var date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
    ' ' + date.getHours + ':' + date.getMinutes + ':' + date.getSeconds;
}
//return weeknumber , param date pattern : yyyy-MM-dd
const getWeek = (date) => {
  var date1 = new Date(date);
  return date1.getDay();
}

//return weekstr CN , param date pattern : yyyy-MM-dd
const getWeekStr = (date) => {
  var date1 = new Date(date);
  var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return weekArray[date1.getDay()];
}

module.exports = {
  getDate: getDate,
  getDateDetail: getDateDetail,
  getWeek: getWeek,
  getWeekStr: getWeekStr
}