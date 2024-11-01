<template>
  <div class="container">
    <h1>Theaters CRUD</h1>
    
    <form @submit.prevent="saveTheater" class="form">
      <input type="text" v-model="theater.name" placeholder="Theater Name" required class="input" />
      <input type="text" v-model="theater.location" placeholder="Location" required class="input" />
      <input type="number" v-model="theater.capacity" placeholder="Capacity" required class="input" />
      <textarea v-model="theater.description" placeholder="Description" class="input textarea"></textarea>
      <input type="text" v-model="theater.image_path" placeholder="Image Path" required class="input" />
      <button type="submit" class="button">{{ isEdit ? "Update" : "Add" }} Theater</button>
    </form>

    <table class="theater-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Capacity</th>
          <th>Description</th>
          <th>Image Path</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="theater in theaters" :key="theater.id">
          <td>{{ theater.name }}</td>
          <td>{{ theater.location }}</td>
          <td>{{ theater.capacity }}</td>
          <td>{{ theater.description }}</td>
          <td>{{ theater.image_path }}</td>
          <td>
            <button @click="editTheater(theater)" class="button edit-button">Edit</button>
            <button @click="deleteTheater(theater.id)" class="button delete-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TheaterTable',
  data() {
    return {
      theaters: [],
      theater: {
        name: '',
        location: '',
        capacity: null,
        description: '',
        image_path: ''
      },
      isEdit: false,
      editTheaterId: null
    };
  },
  created() {
    this.fetchTheaters();
  },
  methods: {
    async fetchTheaters() {
      try {
        const response = await axios.get('http://localhost:3001/api/theaters');
        this.theaters = response.data;
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    },
    async saveTheater() {
      try {
        if (this.isEdit) {
          await axios.put(`http://localhost:3001/api/theaters/${this.editTheaterId}`, this.theater);
        } else {
          const response = await axios.post('http://localhost:3001/api/theaters', this.theater);
          this.theaters.push(response.data);
        }
        this.resetForm();
        this.fetchTheaters();
      } catch (error) {
        console.error('Error saving theater:', error);
      }
    },
    editTheater(theater) {
      this.theater = { ...theater };
      this.isEdit = true;
      this.editTheaterId = theater.id;
    },
    async deleteTheater(id) {
      try {
        await axios.delete(`http://localhost:3001/api/theaters/${id}`);
        this.fetchTheaters();
      } catch (error) {
        console.error('Error deleting theater:', error);
      }
    },
    resetForm() {
      this.theater = { name: '', location: '', capacity: null, description: '', image_path: '' };
      this.isEdit = false;
      this.editTheaterId = null;
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

.textarea {
  width: 100%;
  height: 80px;
  resize: none;
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

.theater-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.theater-table th, .theater-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.theater-table th {
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
}

.theater-table tr:nth-child(even) {
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
