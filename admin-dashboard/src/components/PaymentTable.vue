<template>
    <div>
      <h1>Payments CRUD</h1>
      <!-- Form untuk menambah atau mengedit pembayaran -->
      <form @submit.prevent="savePayment">
        <input type="number" v-model="payment.booking_id" placeholder="Booking ID" required />
        <input type="number" v-model="payment.amount" placeholder="Amount" required />
        <input type="date" v-model="payment.payment_date" placeholder="Payment Date" required />
        <select v-model="payment.status">
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <button type="submit">{{ isEdit ? "Update" : "Add" }} Payment</button>
      </form>
  
      <!-- Tabel untuk menampilkan payments -->
      <table>
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
              <button @click="editPayment(payment)">Edit</button>
              <button @click="deletePayment(payment.id)">Delete</button>
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
            // Update payment
            await axios.put(`http://localhost:3001/api/payments/${this.editPaymentId}`, this.payment);
          } else {
            // Add new payment
            const response = await axios.post('http://localhost:3001/api/payments', this.payment);
            this.payments.push(response.data);
          }
          this.resetForm();
          this.fetchPayments(); // Refresh list
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
  