<template>
  <div class="container">
    <h1>User Table CRUD</h1>
    
    <form @submit.prevent="saveUser" class="form">
      <input type="text" v-model="user.username" placeholder="Username" required class="input" />
      <input type="password" v-model="user.password" placeholder="Password" required class="input" />
      <button type="submit" class="button">{{ isEdit ? "Update" : "Add" }} User</button>
    </form>

    <table class="user-table">
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
            <button @click="editUser(user)" class="button edit-button">Edit</button>
            <button @click="deleteUser(user.id)" class="button delete-button">Delete</button>
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
  emits: ['user-updated'],
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
        this.$emit('user-updated')
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
        this.$emit('user-updated')
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
        this.$emit('user-updated')
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
.container {
  max-width: 100%; /* Make container full width */
  padding: 20px;
}

h1 {
  text-align: left; /* Align title to the left */
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.form {
  display: flex;
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

.user-table {
  width: 100%; /* Make the table take the full width */
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.user-table th {
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
}

.user-table tr:nth-child(even) {
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
