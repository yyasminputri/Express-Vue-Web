<template>
  <div>
    <h1>Movies CRUD</h1>
    <!-- Form to add or edit a movie -->
    <form @submit.prevent="saveMovie">
      <input type="text" v-model="movie.title" placeholder="Title" required />
      <input type="text" v-model="movie.genre" placeholder="Genre" required />
      <input type="number" v-model="movie.release_year" placeholder="Release Year" required />
      <input type="number" step="0.1" v-model="movie.rating" placeholder="Rating" required />
      <textarea v-model="movie.description" placeholder="Description"></textarea>
      <input type="text" v-model="movie.image_path" placeholder="Image Path" required />
      <button type="submit">{{ isEdit ? "Update" : "Add" }} Movie</button>
    </form>

    <!-- Table to display movies -->
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Release Year</th>
          <th>Rating</th>
          <th>Description</th>
          <th>Image Path</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.title }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.release_year }}</td>
          <td>{{ movie.rating }}</td>
          <td>{{ movie.description }}</td>
          <td>{{ movie.image_path }}</td>
          <td>
            <button @click="editMovie(movie)">Edit</button>
            <button @click="deleteMovie(movie.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MovieTable',
  data() {
    return {
      movies: [],
      movie: {
        title: '',
        genre: '',
        release_year: null,
        rating: null,
        description: '',
        image_path: '' // New field for image path
      },
      isEdit: false,
      editMovieId: null
    };
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('http://localhost:3001/api/movies');
        this.movies = response.data;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    async saveMovie() {
      try {
        if (this.isEdit) {
          // Update movie
          await axios.put(`http://localhost:3001/api/movies/${this.editMovieId}`, this.movie);
        } else {
          // Add new movie
          const response = await axios.post('http://localhost:3001/api/movies', this.movie);
          this.movies.push(response.data);
        }
        this.resetForm();
        this.fetchMovies(); // Refresh list
      } catch (error) {
        console.error('Error saving movie:', error);
      }
    },
    editMovie(movie) {
      this.movie = { ...movie };
      this.isEdit = true;
      this.editMovieId = movie.id;
    },
    async deleteMovie(id) {
      try {
        await axios.delete(`http://localhost:3001/api/movies/${id}`);
        this.fetchMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    },
    resetForm() {
      this.movie = { title: '', genre: '', release_year: null, rating: null, description: '', image_path: '' };
      this.isEdit = false;
      this.editMovieId = null;
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
