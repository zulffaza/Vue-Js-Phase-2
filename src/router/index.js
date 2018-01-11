import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Customer from '../pages/customer'
import CustomerAdd from '../pages/customerAdd'
import Address from '../pages/address'
import AddressAdd from '../pages/addressAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {
      path: '/add/customer',
      name: 'CustomerAdd',
      component: CustomerAdd
    },
    {
      path: '/add/customer/:id',
      name: 'CustomerAdd',
      component: CustomerAdd
    },
    {
      path: '/customer/:id/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/add/customer/:customerId/address',
      name: 'AddressAdd',
      component: AddressAdd
    },
    {
      path: '/add/customer/:customerId/address/:id',
      name: 'AddressAdd',
      component: AddressAdd
    }
  ]
})
