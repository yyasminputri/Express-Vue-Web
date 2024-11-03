<template>
  <div class="container">
    <h1>Bookings CRUD</h1>

    <!-- Form Section -->
    <form @submit.prevent="saveBooking" class="form">
      <input type="text" v-model="booking.name" placeholder="Name" required class="input" />
      <input type="number" v-model="booking.movie_id" placeholder="Movie ID" required class="input" />
      <input type="number" v-model="booking.theater_id" placeholder="Theater ID" required class="input" />
      <input type="date" v-model="booking.booking_date" placeholder="Booking Date" required class="input" />

      <!-- Button to open seat selection modal -->
      <button type="button" @click="showSeatSelection = true" class="input">
        {{ selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Select Seats' }}
      </button>

      <button type="submit" class="button">{{ isEdit ? "Update" : "Add" }} Booking</button>
    </form>

    <!-- Seat Selection Modal -->
    <div v-if="showSeatSelection" class="seat-modal">
      <div class="seat-selection">
        <h3>Select Your Seats</h3>
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="seat-row">
          <span v-for="(seat, seatIndex) in seats" :key="seatIndex" 
                :class="['seat', { 'selected': isSelected(row + seat) }]"
                @click="toggleSeat(row + seat)">
            {{ row + seat }}
          </span>
        </div>
        <div class="modal-actions">
          <button @click="confirmSeatSelection" class="button">Confirm</button>
          <button @click="cancelSeatSelection" class="button cancel-button">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Bookings Table -->
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
        <tr v-if="bookings.length === 0">
          <td colspan="6" style="text-align: center;">No bookings available</td>
        </tr>
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
        seats: ''
      },
      isEdit: false,
      editBookingId: null,
      showSeatSelection: false,
      rows: ['A', 'B', 'C', 'D', 'E', 'F'],
      seats: Array.from({ length: 14 }, (_, i) => i + 1),
      selectedSeats: []
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
        console.log("Fetched bookings:", this.bookings); // Debug log to confirm data fetching
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    },
    async saveBooking() {
      try {
        this.booking.seats = this.selectedSeats.join(', '); // Store seat identifiers as comma-separated string
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
      this.selectedSeats = booking.seats.split(', '); // Parse seats back into array
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
      this.booking = { name: '', movie_id: null, theater_id: null, booking_date: '', seats: '' };
      this.isEdit = false;
      this.editBookingId = null;
      this.selectedSeats = [];
    },
    isSelected(seat) {
      return this.selectedSeats.includes(seat);
    },
    toggleSeat(seat) {
      if (this.selectedSeats.includes(seat)) {
        this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
      } else {
        this.selectedSeats.push(seat);
      }
    },
    confirmSeatSelection() {
      this.showSeatSelection = false;
    },
    cancelSeatSelection() {
      this.showSeatSelection = false;
      this.selectedSeats = []; // Clear selection if canceled
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 20px;
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

/* Enlarged Seat Modal Styling */
.seat-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Darker overlay for better visibility in dark mode */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.seat-selection {
  background-color: #f1f1f1; /* Light background for contrast */
  color: #333; /* Dark text color for readability */
  padding: 30px;
  border-radius: 10px;
  max-width: 600px;
  text-align: center;
}

.seat-selection h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333; /* Darker text for visibility */
}

.seat-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 8px;
}

.seat {
  width: 40px;
  height: 40px;
  border: 1px solid #333;
  background-color: #f9f9f9; /* Light background for each seat */
  text-align: center;
  line-height: 40px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.seat.selected {
  background-color: #007bff; /* Highlighted color for selected seats */
  color: #fff; /* White text on selected seats */
}

.modal-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #dc3545;
}

.cancel-button:hover {
  background-color: #c82333;
}

</style>

