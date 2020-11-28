<template>
    <div id="watched_films">
        <h2>Films I have already watched</h2>
        <p v-for="(film, index) in watchedFilms" :key="index">{{film.title}}</p>
    </div>
</template>

<script>

export default {
    name: 'watched-films',
    props: ['watchedFilms']
}
</script>

<style>

#watched_films {
  font-family: "Noto Sans SC";
}

</style>