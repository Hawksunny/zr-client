import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NoAuth from '@/components/NoAuth'
import SysUser from '@/components/sys/User'
import SysRole from '@/components/sys/Role'
import SysProfile from '@/components/sys/Profile'
<<<<<<< HEAD
import ReportCar from '@/components/rep/ReportCar'
import ReportMoney from '@/components/rep/ReportMoney'
=======
import ShopCity from '@/components/shop/City'
import CarCar from '@/components/car/Car'
import LeaseOrder from '@/components/lease/Order'
import CarWork from '@/components/car/Work'
>>>>>>> 95c8c802e0fe8e59be89a13ccdd48c71b2bc9469

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
          path: '/SysRole',
          name: 'SysRole',
          component: SysRole
        },
        {
          path: '/SysProfile',
          name: 'SysProfile',
          component: SysProfile
        },
        {
<<<<<<< HEAD
          path: '/ReportCar',
          name: 'ReportCar',
          component: ReportCar
        },
        {
          path: '/ReportMoney',
          name: 'ReportMoney',
          component: ReportMoney
        }
=======
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
          path: '/CarWork',
          name: 'CarWork',
          component: CarWork
        },
        {
          path: '/LeaseOrder',
          name: 'LeaseOrder',
          component: LeaseOrder
        },
>>>>>>> 95c8c802e0fe8e59be89a13ccdd48c71b2bc9469
      ]
    }
  ]
})
