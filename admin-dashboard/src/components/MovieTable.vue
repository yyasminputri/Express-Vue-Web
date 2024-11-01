<template>
  <div class="container">
    <h1>Movies CRUD</h1>
    
    <form @submit.prevent="saveMovie" class="form">
      <input type="text" v-model="movie.title" placeholder="Title" required class="input" />
      <input type="text" v-model="movie.genre" placeholder="Genre" required class="input" />
      <input type="number" v-model="movie.release_year" placeholder="Release Year" required class="input" />
      <input type="number" step="0.1" v-model="movie.rating" placeholder="Rating" required class="input" />
      <textarea v-model="movie.description" placeholder="Description" class="input textarea"></textarea>
      <input type="text" v-model="movie.image_path" placeholder="Image Path" required class="input" />
      <button type="submit" class="button">{{ isEdit ? "Update" : "Add" }} Movie</button>
    </form>

    <table class="movie-table">
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
            <button @click="editMovie(movie)" class="button edit-button">Edit</button>
            <button @click="deleteMovie(movie.id)" class="button delete-button">Delete</button>
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
        image_path: ''
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
          await axios.put(`http://localhost:3001/api/movies/${this.editMovieId}`, this.movie);
        } else {
          const response = await axios.post('http://localhost:3001/api/movies', this.movie);
          this.movies.push(response.data);
        }
        this.resetForm();
        this.fetchMovies();
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

.movie-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.movie-table th, .movie-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.movie-table th {
  background-color: #f9f9f9;
  color: #333;
  font-weight: bold;
}

.movie-table tr:nth-child(even) {
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