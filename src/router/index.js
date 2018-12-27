import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index';//首页
import Login from '@/views/Login/Login';//首页
import Notice from '@/views/Notice/Notice';//首页
import Order from '@/views/Order/Index';   //报销
import OrderDetail from '@/views/Order/Detail';   //报单详情
import OrderSuccess from '@/views/Order/OrderSuccess';   //报单成功
import Asset from '@/views/Asset/Index';   //资产总览
import Account from '@/views/Account/Index';   //资产总览
import AccountDetail from '@/views/Account/AccountDetail';   //明细
import UserCenter from '@/views/UserCenter/Index';   //用户中心
import Invitation from '@/views/UserCenter/Invitation';   //邀请码
import Authentication from '@/views/UserCenter/Authentication';   //实名认证
import TradersPassword from '@/views/UserCenter/TradersPassword';   //交易密码设置
import Bank from '@/views/UserCenter/Bank';   //银行卡设置

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/Invitation',
      name: 'Invitation',
      component: Invitation
    },
    {
      path: '/Authentication',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/Bank',
      name: 'Bank',
      component: Bank
    },
    {
      path: '/TradersPassword',
      name: 'TradersPassword',
      component: TradersPassword
    },
    {
      path: '/Asset',
      name: 'Asset',
      component: Asset
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/AccountDetail',
      name: 'AccountDetail',
      component: AccountDetail
    }
  ]
})
