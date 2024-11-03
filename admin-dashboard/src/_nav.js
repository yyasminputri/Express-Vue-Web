export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'My Cinemas',
  },
  {
    component: 'CNavItem',
    name: 'User List',
    to: '/users', // Sesuaikan dengan route yang Anda buat untuk halaman User Table
    icon: 'cil-people', // Anda dapat menggunakan ikon lain jika diinginkan
  },
  {
    component: 'CNavItem',
    name: 'Movies',
    to: '/movies',
    icon: 'cil-puzzle', // Anda bisa mengganti ikon sesuai keinginan
  },
  {
    component: 'CNavItem',
    name: 'Theaters',
    to: '/theaters',
    icon: 'cil-notes', // Ikon yang cocok untuk menandakan "Theater"
  },
  {
    component: 'CNavItem',
    name: 'Bookings',
    to: '/bookings',
    icon: 'cil-calendar', // Ikon yang cocok untuk menandakan "Booking"
  },
  {
    component: 'CNavItem',
    name: 'Payments',
    to: '/payments',
    icon: 'cil-calculator', // Pilih ikon yang sesuai untuk "Payments"
  },  
]
