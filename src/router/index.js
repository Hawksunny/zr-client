import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NoAuth from '@/components/NoAuth'
import SysUser from '@/components/sys/User'
import SysRole from '@/components/sys/Role'
import SysProfile from '@/components/sys/Profile'

import ShopShop from '@/components/shop/Shop'

import ReportCar from '@/components/rep/ReportCar'
import ReportMoney from '@/components/rep/ReportMoney'
import ShopCity from '@/components/shop/City'
import LeaseCustomer from '@/components/lease/Customer'
import LeaseAgreement from '@/components/lease/Agreement'
import CarCar from '@/components/car/Car'
import LeaseOrder from '@/components/lease/Order'
import CarWork from '@/components/car/Work'


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

          path: '/ShopShop',
          name: 'ShopShop',
          component: ShopShop
        },
{
          path: '/ReportCar',
          name: 'ReportCar',
          component: ReportCar
        },
        {
          path: '/ReportMoney',
          name: 'ReportMoney',
          component: ReportMoney
        },
        {
          path: '/ShopCity',
          name: 'ShopCity',
          component: ShopCity
        },
        {
          path: '/LeaseCustomer',
          name: 'LeaseCustomer',
          component: LeaseCustomer
        },
        {
          path: '/LeaseAgreement',
          name: 'LeaseAgreement',
          component: LeaseAgreement
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

      ]
    }
  ]
})
