import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PostItem from '@/components/Item/PostItem'
import Profile from '@/components/User/Profile'
import SignIn from '@/components/User/SignIn'
import SignUp from '@/components/User/SignUp'
import Search from '@/components/Item/Search'
import Deals from '@/components/Item/Deals'
import Item from '@/components/Item/item'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/item/add',
      name: 'Post Item',
      component: PostItem,
      beforeEnter: AuthGuard
    },
    {
      path: '/item/search',
      name: 'Search Item',
      component: Search
    },
    {
      path: '/item/deals',
      name: 'Deals',
      component: Deals,
      beforeEnter: AuthGuard
    },
    {
      path: '/item/:id',
      name: 'item',
      props: true,
      component: Item
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp
    }
  ],
  mode: 'history'
})
