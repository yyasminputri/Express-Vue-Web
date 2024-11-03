<script setup>
import { 
  Film, 
  Star, 
  Users, 
  Brain 
} from 'lucide-vue-next'
import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import MainChart from './MainChart.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Styles
const cardContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap: '1rem',
  padding: '1rem'
}

const logoCardStyle = {
  width: '150px',
  height: '150px',
  background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
}

const logoContentStyle = {
  textAlign: 'center',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const logoNumberStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem'
}

const logoTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: '500',
  letterSpacing: '1px'
}

const logoIconStyle = {
  marginBottom: '0.5rem'
}

const hoveredCard = ref(null)

const handleMouseOver = (cardId) => {
  hoveredCard.value = cardId
}

const handleMouseLeave = () => {
  hoveredCard.value = null
}

// Table data
const tableExample = ref([
  {
    avatar: { src: avatar1, status: 'success' },
    user: {
      name: 'Yiorgos Avraamu',
      new: true,
      registered: 'Jan 1, 2023',
    },
    usage: {
      value: 50,
      period: 'Jun 11, 2023 - Jul 10, 2023',
      color: 'success',
    },
    activity: '10 sec ago',
  },
  {
    avatar: { src: avatar2, status: 'danger' },
    user: {
      name: 'Avram Tarasios',
      new: false,
      registered: 'Jan 1, 2023',
    },
    usage: {
      value: 22,
      period: 'Jun 11, 2023 - Jul 10, 2023',
      color: 'info',
    },
    activity: '5 minutes ago',
  },
  {
    avatar: { src: avatar3, status: 'warning' },
    user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
    usage: {
      value: 74,
      period: 'Jun 11, 2023 - Jul 10, 2023',
      color: 'warning',
    },
    activity: '1 hour ago',
  },
  {
    avatar: { src: avatar4, status: 'secondary' },
    user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
    usage: {
      value: 98,
      period: 'Jun 11, 2023 - Jul 10, 2023',
      color: 'danger',
    },
    activity: 'Last month',
  },
  {
    avatar: { src: avatar5, status: 'success' },
    user: {
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2023',
    },
    usage: {
      value: 22,
      period: 'Jun 11, 2023 - Jul 10, 2023',
      color: 'primary',
    },
    activity: 'Last week',
  },
])

// Computed property untuk menghitung jumlah user
const userCount = ref(0)

// Fetch jumlah user langsung dari API
const fetchUserCount = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/users')
    userCount.value = response.data.length
  } catch (error) {
    console.error('Error fetching user count:', error)
  }
}

// Panggil fetchUserCount saat komponen dimount
onMounted(() => {
  fetchUserCount()
})

// Navigation cards yang menggunakan userCount langsung
const navigationCards = computed(() => [
  { id: 'movie', title: 'MOVIE', number: '2.2', icon: Film, href: '#/movies' },
  { id: 'theaters', title: 'THEATERS', icon: Film, href: '#/theaters' },
  { id: 'booking', title: 'BOOKING', icon: Star, href: '#/bookings' },
  { id: 'users', title: 'USERS', number: userCount.value, icon: Users, href: '#/users' },
  { id: 'payment', title: 'PAYMENT', icon: Brain, href: '#/payments' }
])

// Event handler untuk update jumlah user ketika ada perubahan di UserTable
const updateUserCount = () => {
  fetchUserCount()
}

const salesData = ref([
  {
    title: 'Daily',
    data: [
      { name: 'Dolby', sales: '100' },
      { name: 'Neptune', sales: '320' },
      { name: 'Royale', sales: '560' },
      { name: 'Ectournias', sales: '150' },
      { name: 'Bronco', sales: '210' },
      { name: 'Avocado', sales: '120' },
      { name: 'Promotion', sales: '80' }
    ]
  },
  {
    title: 'Weekly',
    data: [
      { name: 'Titan', sales: '0' },
      { name: 'Dino', sales: '300' },
      { name: 'Kratos', sales: '580' },
      { name: 'IMAX', sales: '750' },
      { name: 'Max', sales: '210' },
      { name: 'Flex', sales: '180' },
      { name: 'Onyx', sales: '90' }
    ]
  },
  {
    title: 'Revenue',
    data: [
      { name: 'Dolby', sales: '$20,000' },
      { name: 'Neptune', sales: '$32,500' },
      { name: 'Royale', sales: '$50,000' },
      { name: 'Ectournias', sales: '$15,000' },
      { name: 'Bronco', sales: '$21,000' },
      { name: 'Avocado', sales: '$12,000' },
      { name: 'Promotion', sales: '$8,000' }
    ]
  }
])
</script>

<template>
  <div class="sales-summary" style="width: 100%; display: flex; justify-content: space-between; padding: 20px; background-color: #f0f2f5; border-radius: 8px;">
    <div 
      v-for="(section, index) in salesData" 
      :key="index" 
      class="table-section" 
      style="width: 30%; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin: 0 10px;">
      
      <!-- Section Title -->
      <div style="background-color: #f85a5a; color: #fff; padding: 10px; text-align: center; font-weight: bold;">
        {{ section.title }}
      </div>

      <!-- Table Header -->
      <div style="padding: 10px;">
        <div style="display: flex; font-weight: bold; color: #555; padding: 8px 0; border-bottom: 1px solid #ddd;">
          <div style="width: 50%; text-align: left;">Name</div>
          <div style="width: 50%; text-align: right;">Sales</div>
        </div>

        <!-- Table Rows -->
        <div 
          v-for="(item, idx) in section.data" 
          :key="idx" 
          style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
          <div style="width: 50%; text-align: left;">{{ item.name }}</div>
          <div style="width: 50%; text-align: right;">{{ item.sales }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Cards -->
  <div class="w-100 mt-4 mb-4">
    <div :style="cardContainerStyle" class="rounded-lg p-4">
      <a
        v-for="card in navigationCards"
        :key="card.id"
        :href="card.href"
        class="text-decoration-none"
      >
        <div
          :style="{
            ...logoCardStyle,
            transform: hoveredCard === card.id ? 'translateY(-5px)' : 'none',
            boxShadow: hoveredCard === card.id ? '0 10px 20px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)'
          }"
          @mouseover="handleMouseOver(card.id)"
          @mouseleave="handleMouseLeave"
        >
          <div :style="logoContentStyle">
            <component 
              :is="card.icon" 
              :style="logoIconStyle"
              size="24"
              color="white"
            />
            <template v-if="card.number">
              <div :style="logoNumberStyle">{{ card.number }}</div>
            </template>
            <div :style="logoTitleStyle">{{ card.title }}</div>
          </div>
        </div>
      </a>
    </div>
  </div>

  <!-- User Table -->
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4 shadow-lg border-0 rounded-lg bg-white">
          <CCardHeader class="text-white text-center rounded-top" style="background: linear-gradient(90deg, #ff416c, #ff4b2b);">
            <h5 class="mb-0">Top 5 Customers</h5>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" class="mb-0 border border-light shadow-sm" hover responsive>
              <CTableHead class="text-nowrap">
                <CTableRow class="bg-light">
                  <CTableHeaderCell class="text-center text-danger bg-white">Avatar</CTableHeaderCell>
                  <CTableHeaderCell class="text-danger bg-white">User</CTableHeaderCell>
                  <CTableHeaderCell class="text-danger bg-white">Usage</CTableHeaderCell>
                  <CTableHeaderCell class="text-danger bg-white">Activity</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in tableExample" :key="item.user.name">
                  <CTableDataCell class="text-center">
                    <CAvatar size="md" :src="item.avatar.src" :status="item.avatar.status" class="border border-danger rounded-circle" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="fw-bold">{{ item.user.name }}</div>
                    <div class="small text-body-secondary text-nowrap">
                      <span :class="item.user.new ? 'text-success' : 'text-danger'">
                        {{ item.user.new ? 'New' : 'Recurring' }}
                      </span>
                      | {{ item.user.registered }}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="fw-semibold">{{ item.usage.value }}%</div>
                      <div class="text-nowrap text-body-secondary small ms-3">
                        {{ item.usage.period }}
                      </div>
                    </div>
                    <CProgress thin :color="item.usage.color" :value="item.usage.value" class="mt-1" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="small text-body-secondary">Last login</div>
                    <div class="fw-semibold text-nowrap">{{ item.activity }}</div>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>