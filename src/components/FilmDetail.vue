<template>
  <div class="selected-film">
      <h2> {{film.title}} </h2>
      <p> {{film.director}} </p>
      <p> {{film.release_date}} </p>
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

</style>