<template>
  <div id="main-content">
    
  <section class="film-select-container">
   <label for="film-select">Select a Film:</label>
    <select id="film-select" v-model="selectedFilm">
      <option disabled value="">Select a Film</option>
      <option v-for="(film, index) in films" :key="index" :value="film">{{film.title}}</option>
    </select>
  </section>
    <div>
      <film-details v-if="selectedFilm" :film="selectedFilm"></film-details>
    </div>

      <button v-if="!faveFilms.includes(selectedFilm)" v-on:click="addToFaves">Add to Fave Films</button>
      <button v-if="!watchedFilms.includes(selectedFilm)" v-on:click="addToWatched">Add to Watched Films</button>
 
      <fave-films :faveFilms="faveFilms"></fave-films>

      <watched-films :watchedFilms="watchedFilms"></watched-films>

      <unwatched-films :unwatchedFilms="unwatchedFilms"></unwatched-films>
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
      watchedFilms: [],
      unwatchedFilms: []
    }
  },
  components: {
    'film-details': FilmDetail,
    'fave-films': FaveFilmList,
    'watched-films': WatchedFilms,
    'unwatched-films': UnwatchedFilms
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
    addToUnwatched(){
      this.films.forEach(film => {
        this.unwatchedFilms.push(film)
      });
    },
    fetchData(){
      fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => response.json())
      .then(data => this.films = data)
      .then(this.addToUnwatched)
    },
    addToFaves(){
      this.faveFilms.push(this.selectedFilm);
      if (this.watchedFilms.includes(this.selectedFilm)) {
        return;
      }else{
        return this.addToWatched();
      }
    },
    addToWatched(){
      this.watchedFilms.push(this.selectedFilm);
      this.removeFromUnwatched(this.selectedFilm.id);
    },
    removeFromUnwatched(id){
      return this.unwatchedFilms = this.unwatchedFilms.filter(el => el.id !==id)
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



<style lang="css">

#main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

label {
  font-family: "Noto Sans SC";
}

.film-select-container {
    font-family: "Noto Sans SC";
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 2px solid black;
    border-radius: 5px;
    list-style-type: none;
    max-width: 250px;
    margin: 10px;
    padding: 5px;
    background-color: white;
}

select {
  font-family: "Noto Sans SC";
  max-width: 200px;
  justify-content: center;
  align-items: center;
  align-content: center;
}

button {
  font-family: "Noto Sans SC";
  background-color: white;
  border-radius: 5px;
  margin-top: 15px;
  margin-right: 15px;
}

button:hover{
  color: white;
  background-color: black;
}
</style>
