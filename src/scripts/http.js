/**
 * Created by zhujie on 2018/9/21.
 */
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
class httpValidate {
  constructor(opts) {
    if (opts.hasOwnProperty("until")) {
      this.$until = opts["until"];
    }
    if (opts.hasOwnProperty("axios")) {
      this.$axios = opts["axios"];
    }
    this.pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
    this.cancelToken = opts.axios.CancelToken;
    this.responseHttp();
    this.requestHttp();
  }

  removePending(config) {
    for (let p in this.pending) {
      if (this.pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
        this.pending[p].f(); //执行取消操作
        this.pending.splice(p, 1); //把这条记录从数组中移除
      }
    }
  }

  responseHttp() {
    this.$axios.interceptors.response.use((response) => {
      this.removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
      return response;
    }, (error) => {
      if (error && error.response) {
        let res = error.response.data;
        switch (error.response.status.toString()) {
          case "401":
            if (window.localStorage) {
              localStorage.removeItem('UserInfo');
              localStorage.removeItem("navTabIndex");
              localStorage.removeItem("Token");
            }
            /*            Message({
             mode: "confirm",
             title: "提示",
             content: "未登录或登录已超时！",
             okLabel: "确认",
             type: "info",
             cancelLabel: "取消",
             beforeClose: (e) => {
             if (e) {
             window.location.href = "/#/Login";
             }
             }
             });*/
            Message.confirm(res.msg || '未登录或登录已超时！', '提示', {
              type: 'info'
            }).then(({result}) => {
              if (result) {
                window.location.href = "/#/Login";
              }
            });
            break;
          case "403":
            Toast.message({
              message: res.msg || '无权限',
              time: 3000,
              position: "top",
              color: "red",
              textColor: "#fff"
            });
            break;
          case "404":
            Message.confirm(res.msg || '你访问的页面不存在！', '提示', {
              type: 'info'
            }).then(({result}) => {
              if (result) {
                window.location.href = "/";
              }
            });
            break;
          case "500":
            Toast.message({
              message: res.msg || '服务器异常！',
              time: 3000,
              position: "top",
              color: "red",
              textColor: "#fff"
            });
            break;
          default:
            Toast.message({
              message: res.msg || "系统错误!",
              time: 3000,
              position: "top",
              color: "red",
              textColor: "#fff"
            });
            break;
        }
      }
      return Promise.reject(error);
    });
  }

  requestHttp() {
    this.$axios.interceptors.request.use(request => {
        let token = localStorage.getItem("Token");
        if (null != token) {
          request.headers["token"] = token;
        } else {
          let newToken = this.$until.builderToken();
          localStorage.setItem("Token", newToken);
          request.headers["token"] = newToken;
        }
        this.removePending(request); //在一个ajax发送前执行一下取消操作
        request.cancelToken = new this.cancelToken((c) => {
          // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
          this.pending.push({u: request.url + '&' + request.method, f: c});
        });
        return request;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
}
export {
  httpValidate as http
}
