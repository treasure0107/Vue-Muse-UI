let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl;
if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://vipapi.1903.love/api';
  imgBaseUrl = 'https://ufe.oss-cn-shenzhen.aliyuncs.com';
} else if (process.env.NODE_ENV == 'production') {
  //正式环境
  baseUrl = "http://vip.1903.love/api";
  imgBaseUrl = 'https://ufe.oss-cn-shenzhen.aliyuncs.com';
}
export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
