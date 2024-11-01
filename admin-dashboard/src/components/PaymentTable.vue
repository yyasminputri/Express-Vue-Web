<template>
  <div class="container">
    <h1>Payments CRUD</h1>
    
    <!-- Form to add or edit a payment -->
    <form @submit.prevent="savePayment" class="form">
      <input type="number" v-model="payment.booking_id" placeholder="Booking ID" required class="input" />
      <input type="number" v-model="payment.amount" placeholder="Amount" required class="input" />
      <input type="date" v-model="payment.payment_date" placeholder="Payment Date" required class="input" />
      <select v-model="payment.status" class="input select">
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
      <button type="submit" class="button">{{ isEdit ? "Update" : "Add" }} Payment</button>
    </form>

    <!-- Table to display payments -->
    <table class="payment-table">
      <thead>
        <tr>
          <th>Booking Name</th>
          <th>Booking Date</th>
          <th>Amount</th>
          <th>Payment Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.booking_name }}</td>
          <td>{{ payment.booking_date }}</td>
          <td>{{ payment.amount }}</td>
          <td>{{ payment.payment_date }}</td>
          <td>{{ payment.status }}</td>
          <td>
            <button @click="editPayment(payment)" class="button edit-button">Edit</button>
            <button @click="deletePayment(payment.id)" class="button delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PaymentTable',
  data() {
    return {
      payments: [],
      payment: {
        booking_id: null,
        amount: null,
        payment_date: '',
        status: 'pending'
      },
      isEdit: false,
      editPaymentId: null
    };
  },
  created() {
    this.fetchPayments();
  },
  methods: {
    async fetchPayments() {
      try {
        const response = await axios.get('http://localhost:3001/api/payments');
        this.payments = response.data;
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    },
    async savePayment() {
      try {
        if (this.isEdit) {
          await axios.put(`http://localhost:3001/api/payments/${this.editPaymentId}`, this.payment);
        } else {
          const response = await axios.post('http://localhost:3001/api/payments', this.payment);
          this.payments.push(response.data);
        }
        this.resetForm();
        this.fetchPayments();
      } catch (error) {
        console.error('Error saving payment:', error);
      }
    },
    editPayment(payment) {
      this.payment = { ...payment };
      this.isEdit = true;
      this.editPaymentId = payment.id;
    },
    async deletePayment(id) {
      try {
        await axios.delete(`http://localhost:3001/api/payments/${id}`);
        this.fetchPayments();
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    },
    resetForm() {
      this.payment = { booking_id: null, amount: null, payment_date: '', status: 'pending' };
      this.isEdit = false;
      this.editPaymentId = null;
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

.select {
  font-size: 1rem;
  padding: 10px;
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

.payment-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.payment-table th, .payment-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.payment-table th {
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
}

.payment-table tr:nth-child(even) {
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