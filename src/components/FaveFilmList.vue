<template>
    <div id="fave_films">
        <h2>My Fave Films</h2>
        <ul>
            <li v-for="(faveFilm, index) in faveFilms" :key="index">{{faveFilm.title}}
            <button v-on:click="handleDelete(index)">Remove from Favourites</button></li>
        </ul>
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

#fave_films {
  font-family: "Noto Sans SC";
}

</style>