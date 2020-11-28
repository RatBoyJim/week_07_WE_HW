<template>
  <div>
    <h1>STUDIO GHIBLI FILMS</h1>

   <label for="film-select">Select a Film:</label>
    <select id="film-select" v-model="selectedFilm">
      <option disabled value="">Select a Film</option>
      <option v-for="(film, index) in films" :key="index" :value="film">{{film.title}}</option>
    </select>

    <div>
      <film-details v-if="selectedFilm" :film="selectedFilm"></film-details>
    </div>

      <button v-if="!faveFilms.includes(selectedFilm)" v-on:click="addToFaves">Add to Fave Films</button>
      <button v-if="!watchedFilms.includes(selectedFilm)" v-on:click="addToWatched">Add to Watched Films</button>
 
      <fave-films :faveFilms="faveFilms"></fave-films>

      <watched-films :watchedFilms="watchedFilms"></watched-films>

  </div>
</template>

<script>

import WatchedFilms from './components/WatchedFilms.vue';
import FilmDetail from './components/FilmDetail.vue';
import FaveFilmList from './components/FaveFilmList.vue';
import { eventBus } from '@/main.js';

export default {
  name: 'app',
  data(){
    return {
      films: [],
      selectedFilm: null,
      faveFilms: [],
      watchedFilms: []
    }
  },
  components: {
    'film-details': FilmDetail,
    'fave-films': FaveFilmList,
    'watched-films': WatchedFilms
  },
  // computed: {
  //   initialWatchedFilms: function(){
  //     return this.faveFilms.forEach(film => {
  //       if (this.watchedFilms.includes(film)) {
  //         return;
  //       }else{
  //         return this.watchedFilms.push(film)
  //       console.log(this.watchedFilms);
  //       }
  // })}},
  methods: {
    fetchData(){
      fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => response.json())
      .then(data => this.films = data)
    },
    addToFaves(){
      this.faveFilms.push(this.selectedFilm)
      if (this.watchedFilms.includes(this.selectedFilm)) {
        return;
      }else{
        return this.addToWatched()
      }
    },
    addToWatched(){
      this.watchedFilms.push(this.selectedFilm)
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
h1 {
  font-family: "Noto Sans SC";
}
</style>
