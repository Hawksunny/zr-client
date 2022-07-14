import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NoAuth from '@/components/NoAuth'
import SysUser from '@/components/sys/User'
import SysRole from '@/components/sys/Role'
import SysProfile from '@/components/sys/Profile'
import ReportCar from '@/components/rep/ReportCar'
import ReportMoney from '@/components/rep/ReportMoney'
import ShopCity from '@/components/shop/City'
<<<<<<< HEAD
import LeaseCustomer from '@/components/lease/Customer'
import LeaseAgreement from '@/components/lease/Agreement'
=======
import CarCar from '@/components/car/Car'
import LeaseOrder from '@/components/lease/Order'
import CarWork from '@/components/car/Work'
>>>>>>> 8184c2c0dc68ef2e562e7de1829325b58859cf06

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
=======
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
>>>>>>> 8184c2c0dc68ef2e562e7de1829325b58859cf06
          path: '/ShopCity',
          name: 'ShopCity',
          component: ShopCity
        },
        {
<<<<<<< HEAD
          path: '/LeaseCustomer',
          name: 'LeaseCustomer',
          component: LeaseCustomer
        },
        {
          path: '/LeaseAgreement',
          name: 'LeaseAgreement',
          component: LeaseAgreement
        }
=======
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
>>>>>>> 8184c2c0dc68ef2e562e7de1829325b58859cf06
      ]
    }
  ]
})
