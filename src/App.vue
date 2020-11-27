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

      <button v-if="!faveFilms.includes(selectedFilm)" v-on:click="addToFaves">Add to Fave Films</button>
 
      <fave-films :faveFilms="faveFilms"></fave-films>

  </div>
</template>

<script>

import FilmDetail from './components/FilmDetail.vue';
import FaveFilmList from './components/FaveFilmList.vue';
import { eventBus } from '@/main.js';

export default {
  name: 'app',
  data(){
    return {
      films: [],
      selectedFilm: null,
      faveFilms: []
    }
  },
  components: {
    'film-details': FilmDetail,
    'fave-films': FaveFilmList
  },
  methods: {
    fetchData(){
      fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => response.json())
      .then(data => this.films = data)
    },
    addToFaves(){
      this.faveFilms.push(this.selectedFilm)
    }
  },
  mounted() {
    this.fetchData(),
    eventBus.$on('film-deleted', index => {
      this.faveFilms.splice(index, 1);
    })
  }

}
</script>



<style>

</style>
