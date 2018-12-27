//公用方法
import axios from 'axios';
import {baseUrl, imgBaseUrl} from "@/config/env";
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
export default  {
  //邮箱验证
  isEmail(str) {
    if (str.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
    else return false;
  },
  //手机号码
  isMobile(str) {
    if (!str) return;
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(str);
  },
  //身份证
  isCardID(str) {
    if (!str) return;
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(str);
  },
  /*时间格式化2017-07-31 8:00*/
  formatDate(date) {
    if(date){
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
    }else 
    return null
  },
  //判断是否为数字，包括小数点等于0
  isNumber(str) {
    let reg = /^\d+(\.\d+)?$/;
    return reg.test(str);
  },
  /*匹配大于0的正整数*/
  isNum(str){
    let reg = new RegExp("^[0-9]*[1-9][0-9]*$");
    if (reg.test(str)) {
      return true;
    }
    return false;
  },
  //密码强度验证
  pwdStrong(pwd) {
    if (!pwd) return;
    this.number = 1;
    let regNumber = /[\d]/,
      regTxt = /[a-zA-Z]/;
    let regCn = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (pwd.length >= 6 && pwd.length <= 20) {
      if (regNumber.test(pwd)) {
        this.number++;
      }
      if (regTxt.test(pwd)) {
        this.number++;
      }
      if (regCn.test(pwd)) {
        this.number++;
      }
    }
    return this.number;
  },
  /*生成Token*/
  builderToken() {
    let guid = "";
    for (let i = 1; i <= 32; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      /*   if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
       guid += "-";*/
    }
    return guid;
  },
  formatData(data) {
    var result = typeof (data);
    if (result == "string") {
      data = JSON.parse(data);
    }
    return data;
  },
  responesValidate(data) {
    let newData = this.formatData(data["data"]);
    let res = newData ? newData : data;
    if (res.code != 1) {
      if (res.code == 401) {
        if (window.localStorage) {
          localStorage.removeItem('UserInfo');
          localStorage.removeItem("navTabIndex");
          localStorage.removeItem("Token");
          Message.confirm('未登录或登录已超时！', '提示', {
            type: 'info'
          }).then(({result}) => {
            if (result) {
              window.location.href = "/#/Login";
            }
          });
        }
      }
      else if (res.code == 403) {
        Toast.message({
          message: res.msg || '无权限',
          time: 3000,
          position: "top",
          color: "red",
          textColor: "#fff"
        });
        return false;
      }
      else if (res.code == 404) {
        Message.confirm(res.msg || '你访问的页面不存在！', '提示', {
          type: 'info'
        }).then(({result}) => {
          if (result) {
            window.location.href = "/";
          }
        });
      }
      else if (res.code == 500) {
        Toast.message({
          message: res.msg || '服务器异常！',
          time: 3000,
          position: "top",
          color: "red",
          textColor: "#fff"
        });
        return false;
      }
      else {
        Toast.message({
          message: res.msg || "系统错误!",
          time: 3000,
          position: "top",
          color: "red",
          textColor: "#fff"
        });
        return false;
      }
    }
    return true;
  },
  consoleLog: (ex) => {
    if (window.console) {
      console.log(ex);
    } else {
      window.console = {};
    }
  },
  async $ajax(config){
    try {
      let result = {};
      await
        axios(config).then((data) => {
          if (this.responesValidate(data)) {
            if (data && data.code == 1) {
              result = data;
            }
          }
        });
      return result;
    } catch (ex) {
      this.consoleLog(ex);
    }
  },
  //获取国家列表
  getCountryList(callback) {
    try {
      axios({
        method: "get",
        url: "./static/country.json"
      }).then((result) => {
        if (callback) {
          callback(result);
        }
      });
    } catch (ex) {
      this.consoleLog(ex);
    }
  },
  /*获取图形验证码*/
  async getImgCode(area) {
    try {
      let data = new Object();
      let url = baseUrl + "/common/getImageCaptcha";
      let config = {
        method: "POST",
        data: {"area": area},
        url: url + "?r=" + Math.random()
      };
      await axios(config).then(result => {
        if (this.responesValidate(result)) {
          if (result.data.code == 1) {
            data = result.data;
          }
        }
      });
      return data;
    } catch (ex) {
      this.consoleLog(ex);
    }
  },
  async tostMsg(str, callback, color){
    if (!str) return;
    await  Toast.message({
      time:2500,
      position: "top",
      closeIcon: 'close',
      close: true,
      color: color || "red",
      textColor: "#fff",
      message: str
    });
    window.setTimeout(() => {
      if (callback) {
        callback(true);
      }
    }, 2500);
  },
  /*获取短信验证码*/
  getMsgCode(data, callback) {
    try {
      let url = baseUrl + "/common/sendMobileCaptcha";
      let config = {
        method: "POST",
        url: url + "?r=" + Math.random(),
        data: data
      };
      axios(config).then(result => {
        if (callback && result) {
          callback(result);
        }
      });
    } catch (ex) {
      this.$until.consoleLog(ex);
    }
  },
  /*获取用户信息*/
  getUserInfo(callback) {
    try {
      let url = baseUrl + "/user/getUserInfo";
      axios({
        method: "get",
        url: url + '?r=' + Math.random()
      }).then((result) => {
        if (this.responesValidate(result)) {
          if (callback && result) {
            callback(result.data);
          }
        }
      });
    } catch (ex) {
      this.consoleLog(ex);
    }
  },
  /*是否登录*/
  async getLoginStatus() {
    try {
      let isLogin = false;
      let url = baseUrl + "/user/getLoginStatus";
      await axios({
        method: "get",
        url: url + '?r=' + Math.random()
      }).then((result) => {
        if (result.data && result) {
          if (result.data.code == 1) {
            isLogin = true;
          }
        }
      });
      return isLogin;
    } catch (ex) {
      this.consoleLog(ex);
    }
  },
  getLocation() {
    var arr = document.domain.split('.');
    if (arr.length > 2 && arr[0] == 'www') {
      return arr.slice(1).join('.');
    } else if (arr.length == 2) {
      return arr.join('.');
    }
    else if (arr.length == 3) {
      return arr.join('.');
    }
    else if (arr[0] == 'localhost') {
      return arr.join('.') + ':8080';
    }
    return arr;
  }
}
