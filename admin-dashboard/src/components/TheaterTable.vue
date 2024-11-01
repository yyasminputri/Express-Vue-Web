<template>
  <div>
    <h1>Theaters CRUD</h1>
    <!-- Form to add or edit a theater -->
    <form @submit.prevent="saveTheater">
      <input type="text" v-model="theater.name" placeholder="Theater Name" required />
      <input type="text" v-model="theater.location" placeholder="Location" required />
      <input type="number" v-model="theater.capacity" placeholder="Capacity" required />
      <textarea v-model="theater.description" placeholder="Description"></textarea>
      <input type="text" v-model="theater.image_path" placeholder="Image Path" required />
      <button type="submit">{{ isEdit ? "Update" : "Add" }} Theater</button>
    </form>

    <!-- Table to display theaters -->
    <table>
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
            <button @click="editTheater(theater)">Edit</button>
            <button @click="deleteTheater(theater.id)">Delete</button>
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
        image_path: '' // New field for image path
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
          // Update theater
          await axios.put(`http://localhost:3001/api/theaters/${this.editTheaterId}`, this.theater);
        } else {
          // Add new theater
          const response = await axios.post('http://localhost:3001/api/theaters', this.theater);
          this.theaters.push(response.data);
        }
        this.resetForm();
        this.fetchTheaters(); // Refresh list
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
