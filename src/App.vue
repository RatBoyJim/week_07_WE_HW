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

      <h2>Films I haven't watched yet</h2>
      <p v-for="(film, index) in unwatchedFilms" :key="index">{{ film.title }}</p>

  </div>
</template>

<script>

import UnwatchedFilms from './components/UnwatchedFilms.vue';
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
  //   unwatchedFilms: function() {
  //     let unwatchedFilmList = [];
  //     return this.films.forEach(film => {
  //       if (this.watchedFilms.includes(film)) {
  //         return;
  //       }else{
  //         return unwatchedFilmList.push(film)
  //         return unwatchedFilmList;
  //       }
  //       })
  //     }
  //   },
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
    },
    removeFromUnwatched(index){
      this.unwatchedFilms.splice(index, 1);
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
