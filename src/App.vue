<template>
  <div>
    <h1>Films</h1>

   <label for="film-select">Select a Film:</label>
    <select id="film-select" v-model="selectedFilm">
      <option disabled value="">Select a Film</option>
      <option v-for="(film, index) in films" :key="index" :value="film">{{film.title}}</option>
    </select>

    <div>
      <film-details v-if="selectedFilm" :film="selectedFilm"></film-details>
    </div>


  </div>
</template>

<script>

import FilmDetail from './components/FilmDetail.vue';
import { eventBus } from '@/main.js';

export default {
  name: 'app',
  data(){
    return {
      films: [],
      selectedFilm: null
    }
  },
  components: {
    'film-details': FilmDetail
  },
  methods: {
    fetchData(){
      fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => response.json())
      .then(data => this.films = data)
    }
  },
  mounted() {
    this.fetchData()
  }

}
</script>



<style>

</style>
