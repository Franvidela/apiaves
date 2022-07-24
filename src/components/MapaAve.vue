<template>
  <v-main>

        <template v-if="mostrar">
            <div class="text-center">
              <v-progress-circular v-bind:value="valorprogress"></v-progress-circular>
            </div>
      </template>
      <template v-else>

            <h1> componente mapa </h1>
            <h2>Posición del Ave: {{ mostrarPosicion }}</h2>
                <template>
                        <v-card
                          class="mx-auto"
                          max-width="344"
                        >
                          <v-img
                            v-bind:src="infoave.images.main"
                          ></v-img>

                          <v-card-title>
                            {{ infoave.name.spanish }}
                          </v-card-title>

                          <v-card-subtitle>
                            {{ infoave.name.latin }}
                          </v-card-subtitle>

                          <v-card-actions>
                            <v-btn
                              color="orange lighten-2"
                              text
                            >
                              Datos Adicionales
                            </v-btn>

                            <v-spacer></v-spacer>

                            <v-btn
                              icon
                              @click="show = !show"
                            >
                              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                          </v-card-actions>

                          <v-expand-transition>
                            <div v-show="show">
                              <v-divider></v-divider>

                          <div v-if="mostrarMapa">
                                <v-card-text>
                                <h3>{{ mapaaves.map.title }} </h3>
                                </v-card-text>

                              <v-img
                                v-bind:src="this.mapaaves.map.image"
                              ></v-img>


                              <v-card-text>
                                  <h2> {{ this.mapaaves.iucn.title}}</h2>
                                  <p>{{ this.mapaaves.iucn.description}}</p>
                              </v-card-text>
                          </div>



                            </div>
                          </v-expand-transition>
                        </v-card>
            </template>

            <router-link to="/">Regresar</router-link>







      </template>


  </v-main>
</template>

<script>
import { mapState , mapActions } from 'vuex'
export default{
  name: 'MapaAve',
  data:()=>{
      return{
          mostrar: false,
          valorprogress: 0,
          show: false,
          posicionave: '',
          infoave:'',
          mostrarMapa: false,
      }
  },
  computed:{
    ...mapState(["lasaves", "mapaaves"]),
    mostrarPosicion(){
      let laposicion = parseInt(this.$route.params.posicion);
      console.log(laposicion);
      this.posicionave = laposicion;
      let datoAve = this.lasaves[laposicion];
      this.infoave = datoAve;
      this.mostrar=true;


      setTimeout( ()=>{
        this.valorprogress = 20;
      }, 1000);

      setTimeout( ()=>{
        this.valorprogress = 40;
      }, 2000);

      setTimeout( ()=>{
        this.valorprogress = 60;
      }, 3000);

      setTimeout( ()=>{
        this.valorprogress = 80;
      }, 4000);

      let laruta = datoAve._links.self;




      setTimeout(()=>{

        this.mostrar=false;
        this.consumirSegundaApi(laruta);
      }, 5000);

      return laposicion;

    }
  },
  methods:{
    ...mapActions(["getMap"]),
    async consumirSegundaApi(unaruta){
        await this.getMap(unaruta);
        this.mostrarMapa = true;
    },
  },
  created(){

  },

}
</script>

<style scoped>
</style>
