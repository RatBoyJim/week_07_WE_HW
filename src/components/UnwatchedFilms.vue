<template>
  <div>
        <h2>Films I haven't watched yet</h2>
            <section class="unwatched_films_container">
                <li class="unwatched-films" v-for="(film, index) in unwatchedFilms" :key="index">{{film.title}}</li>
            </section>
  </div>
</template>

<script>
export default {
    name: 'unwatched-films',
    props: ['unwatchedFilms']
}
</script>

<style>

h2 {
    font-family: "Noto Sans SC";
}

.unwatched_films_container {
    font-family: "Noto Sans SC";
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.unwatched-films {
    border: 2px solid black;
    border-radius: 5px;
    list-style-type: none;
    max-width: 250px;
    margin: 10px;
    padding: 5px;
    background-color: white;
}

</style>