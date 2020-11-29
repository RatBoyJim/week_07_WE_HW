<template>
  <div class="selected-film">
      <h2 id="selected-title"> {{film.title}} </h2>
      <p> Directed by: {{film.director}} </p>
      <p> Released: {{film.release_date}} </p>
      <p> {{film.description}} </p>


  </div>
</template>

<script>
export default {
    name: 'film-detail',
    props: ['film']
}
</script>

<style>

#selected-title {
    text-align: center;
}

.selected-film  {
    font-family: "Noto Sans SC";
    border: 2px solid black;
    border-radius: 5px;
    list-style-type: none;
    max-width: 500px;
    margin: 10px;
    padding: 5px;
    background-color: white;
}

</style>