import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import UserTable from '@/components/UserTable.vue';
import MovieTable from '@/components/MovieTable.vue';
import TheaterTable from '@/components/TheaterTable.vue';
import BookingTable from '@/components/BookingTable.vue';
import PaymentTable from '@/components/PaymentTable.vue';
import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/users', 
        name: 'Users',
        component: UserTable, 
      },
      {
        path: '/movies',
        name: 'Movies',
        component: MovieTable,
      },
      {
        path: '/theaters',
        name: 'Theaters',
        component: TheaterTable,
      },
      {
        path: '/bookings',
        name: 'Bookings',
        component: BookingTable,
      },
      {
        path: '/payments',
        name: 'Payments',
        component: PaymentTable,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
