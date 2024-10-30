<template>
  <div>
    <h1>User Table CRUD</h1>
    <!-- Form untuk menambah atau mengedit user -->
    <form @submit.prevent="saveUser">
      <input type="text" v-model="user.username" placeholder="Username" required />
      <input type="password" v-model="user.password" placeholder="Password" required />
      <button type="submit">{{ isEdit ? "Update" : "Add" }} User</button>
    </form>

    <!-- Tabel untuk menampilkan user -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserTable',
  data() {
    return {
      users: [],
      user: {
        username: '',
        password: ''
      },
      isEdit: false,
      editUserId: null
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async saveUser() {
      try {
        if (this.isEdit) {
          // Update user
          await axios.put(`http://localhost:3001/api/users/${this.editUserId}`, this.user);
        } else {
          // Add new user
          const response = await axios.post('http://localhost:3001/api/users', this.user);
          this.users.push(response.data);
        }
        this.resetForm();
        this.fetchUsers(); // Refresh list
      } catch (error) {
        console.error('Error saving user:', error);
      }
    },
    editUser(user) {
      this.user = { ...user };
      this.isEdit = true;
      this.editUserId = user.id;
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${id}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    resetForm() {
      this.user = { username: '', password: '' };
      this.isEdit = false;
      this.editUserId = null;
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
