<template>
    <div id="fave_films">
        <h2>My Fave Films</h2>
        <section class="fave_films_container">
            <li class="fave_films" v-for="(faveFilm, index) in faveFilms" :key="index">{{faveFilm.title}}
            <button v-on:click="handleDelete(index)">Remove from Favourites</button></li>
        </section>
    </div>
</template>

<script>

import { eventBus } from '@/main.js'

export default {
    name: 'fave-films',
    props: ['faveFilms'],
    methods: {
        handleDelete: function(index) {
            eventBus.$emit('film-deleted', index);
    }
  }
}
</script>

<style>

h2 {
    margin-left: 10px;
}

#fave_films {
  font-family: "Noto Sans SC";
}

.fave_films_container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.fave_films {
    font-family: "Noto Sans SC";
    border: 2px solid black;
    border-radius: 5px;
    list-style-type: none;
    max-width: 250px;
    margin: 10px;
    padding: 5px;
    background-color: white;
}

</style>