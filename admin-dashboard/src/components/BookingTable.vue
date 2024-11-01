<template>
  <div class="container">
    <h1>Bookings CRUD</h1>
    
    <form @submit.prevent="saveBooking" class="form">
      <input type="text" v-model="booking.name" placeholder="Name" required class="input" />
      <input type="number" v-model="booking.movie_id" placeholder="Movie ID" required class="input" />
      <input type="number" v-model="booking.theater_id" placeholder="Theater ID" required class="input" />
      <input type="date" v-model="booking.booking_date" placeholder="Booking Date" required class="input" />
      <input type="number" v-model="booking.seats" placeholder="Seats" required class="input" />
      <button type="submit" class="button">{{ isEdit ? "Update" : "Add" }} Booking</button>
    </form>

    <table class="booking-table">
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
            <button @click="editBooking(booking)" class="button edit-button">Edit</button>
            <button @click="deleteBooking(booking.id)" class="button delete-button">Delete</button>
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
          await axios.put(`http://localhost:3001/api/bookings/${this.editBookingId}`, this.booking);
        } else {
          const response = await axios.post('http://localhost:3001/api/bookings', this.booking);
          this.bookings.push(response.data);
        }
        this.resetForm();
        this.fetchBookings();
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
.container {
  max-width: 100%;
  padding: 20px;
}

h1 {
  text-align: left;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
}

.button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.booking-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.booking-table th, .booking-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.booking-table th {
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
}

.booking-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.edit-button {
  background-color: #ffc107;
}

.edit-button:hover {
  background-color: #e0a800;
}

.delete-button {
  background-color: #dc3545;
  margin-left: 5px;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
