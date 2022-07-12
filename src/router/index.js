import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NoAuth from '@/components/NoAuth'
import SysUser from '@/components/sys/User'
import SysProfile from '@/components/sys/Profile'
import ShopCity from '@/components/shop/City'
import CarCar from '@/components/car/Car'
import LeaseOrder from '@/components/lease/Order'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: 'Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [{
          path: '/NoAuth',
          name: 'NoAuth',
          component: NoAuth
        },
        {
          path: '/SysUser',
          name: 'SysUser',
          component: SysUser
        },
        {
          path: '/SysProfile',
          name: 'SysProfile',
          component: SysProfile
        },
        {
          path: '/ShopCity',
          name: 'ShopCity',
          component: ShopCity
        },
        {
          path: '/CarCar',
          name: 'CarCar',
          component: CarCar
        },
        {
          path: '/LeaseOrder',
          name: 'LeaseOrder',
          component: LeaseOrder
        }
      ]
    }
  ]
})
