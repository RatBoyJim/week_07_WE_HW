<template>
  <div id="main-content">
    <h1 id ="heading">STUDIO GHIBLI FILMS</h1>

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
    fetchData(){
      fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => response.json())
      .then(data => this.films = data)
      .then(films => this.unwatchedFilms = films)
    },
    addToFaves(index){
      this.faveFilms.push(this.selectedFilm)
      this.unwatchedFilms.splice(index, 1)
      if (this.watchedFilms.includes(this.selectedFilm)) {
        return;
      }else{
        return this.addToWatched()
      }
    },
    addToWatched(index){
      this.watchedFilms.push(this.selectedFilm)
      this.unwatchedFilms.splice(index, 1);
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



<style lang="css" scoped>

#main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#heading {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
}

h1 {
  font-family: "Noto Sans SC";
}

label {
  font-family: "Noto Sans SC";
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
