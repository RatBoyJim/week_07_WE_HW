<template>
  <div class="unwatched_films">
        <h2>Films I haven't watched yet</h2>
        <p v-for="(film, index) in unwatchedFilms" :key="index">{{film.title}}</p>
  </div>
</template>

<script>
export default {
    name: 'unwatched-films',
    props: ['unwatchedFilms']
}
</script>

<style>

.unwatched_films {
  font-family: "Noto Sans SC";
}

</style>