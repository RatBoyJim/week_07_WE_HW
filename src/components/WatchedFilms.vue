<template>
    <div>
        <h2>Films I have already watched</h2>
            <section class="watched_films_container">
                <li class="watched_films" v-for="(film, index) in watchedFilms" :key="index">{{film.title}}</li>
            </section>
    </div>
</template>

<script>

export default {
    name: 'watched-films',
    props: ['watchedFilms']
}
</script>

<style>

.watched_films_container {
    font-family: "Noto Sans SC";
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.watched_films {
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