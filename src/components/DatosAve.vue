<template>
  <v-main>
        <div class="hello">
          <h1>{{ msg }}</h1>
          <p> {{ respuesta }} </p>
        <div v-if="respuesta != '' ">
          <img v-bind:src="respuesta.images.main" v-bind:alt="respuesta.name.latin">
          <p>{{ respuesta.name.latin }}</p>
          <router-link  v-bind:to="`/mapa/${respuesta.sort}`">Ver Mas</router-link>
        </div>
        <div v-else>
            <h1>NO ENCONTRADO</h1>
        </div>




        </div>
  </v-main>
</template>

<script>
export default {
  name: 'DatosAve',
  props: {
    msg: String,
    respuesta:{},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
