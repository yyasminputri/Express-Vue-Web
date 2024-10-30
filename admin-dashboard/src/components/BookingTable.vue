<template>
    <div>
      <h1>Bookings CRUD</h1>
      <!-- Form untuk menambah atau mengedit booking -->
      <form @submit.prevent="saveBooking">
        <input type="text" v-model="booking.name" placeholder="Name" required />
        <input type="number" v-model="booking.movie_id" placeholder="Movie ID" required />
        <input type="number" v-model="booking.theater_id" placeholder="Theater ID" required />
        <input type="date" v-model="booking.booking_date" placeholder="Booking Date" required />
        <input type="number" v-model="booking.seats" placeholder="Seats" required />
        <button type="submit">{{ isEdit ? "Update" : "Add" }} Booking</button>
      </form>
  
      <!-- Tabel untuk menampilkan bookings -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Movie</th>
            <th>Theater</th>
            <th>Booking Date</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id">
            <td>{{ booking.name }}</td>
            <td>{{ booking.movie_title }}</td>
            <td>{{ booking.theater_name }}</td>
            <td>{{ booking.booking_date }}</td>
            <td>{{ booking.seats }}</td>
            <td>
              <button @click="editBooking(booking)">Edit</button>
              <button @click="deleteBooking(booking.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BookingTable',
    data() {
      return {
        bookings: [],
        booking: {
          name: '',
          movie_id: null,
          theater_id: null,
          booking_date: '',
          seats: null
        },
        isEdit: false,
        editBookingId: null
      };
    },
    created() {
      this.fetchBookings();
    },
    methods: {
      async fetchBookings() {
        try {
          const response = await axios.get('http://localhost:3001/api/bookings');
          this.bookings = response.data;
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      },
      async saveBooking() {
        try {
          if (this.isEdit) {
            // Update booking
            await axios.put(`http://localhost:3001/api/bookings/${this.editBookingId}`, this.booking);
          } else {
            // Add new booking
            const response = await axios.post('http://localhost:3001/api/bookings', this.booking);
            this.bookings.push(response.data);
          }
          this.resetForm();
          this.fetchBookings(); // Refresh list
        } catch (error) {
          console.error('Error saving booking:', error);
        }
      },
      editBooking(booking) {
        this.booking = { ...booking };
        this.isEdit = true;
        this.editBookingId = booking.id;
      },
      async deleteBooking(id) {
        try {
          await axios.delete(`http://localhost:3001/api/bookings/${id}`);
          this.fetchBookings();
        } catch (error) {
          console.error('Error deleting booking:', error);
        }
      },
      resetForm() {
        this.booking = { name: '', movie_id: null, theater_id: null, booking_date: '', seats: null };
        this.isEdit = false;
        this.editBookingId = null;
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  </style>
  