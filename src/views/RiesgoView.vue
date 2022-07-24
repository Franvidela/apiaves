<template>
  <v-main>
    <h1> Aves en Menor Riesgo  </h1>
    <div v-if="mostrar">
                  <div v-if="mostraresperalarga">
                      <h1 v-bind:style="estiloesperalarga"> {{ mensaje }}</h1>
                  </div>
                  <div v-else>
                      <h1 v-bind:style="estiloesperacorta"> {{ mensaje }}</h1>
                  </div>

                  <div class="text-center">
                    <v-progress-circular v-bind:value="valorprogress"></v-progress-circular>
                  </div>
    </div>
    <div v-else>
          <h1 id="exito"> AVES EN MENOR RIESGO DE EXTINCION</h1>

          <template v-for="avex of avesextincion">
                  <v-card
                    class="mx-auto"
                    max-width="344"
                  >
                    <v-img
                      v-bind:src="avex.images.main"
                    ></v-img>

                    <v-card-title>
                      {{ avex.name.spanish }}
                    </v-card-title>

                    <v-card-subtitle>
                      {{ avex.name.latin }}
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

                    <div>
                          <v-card-text>
                          <h3>{{ avex.map.title }} </h3>
                          </v-card-text>

                        <v-img
                          v-bind:src="avex.map.image"
                        ></v-img>


                        <v-card-text>
                            <h2> {{ avex.iucn.title}}</h2>
                            <p>{{ avex.iucn.description}}</p>
                        </v-card-text>
                    </div>



                      </div>
                    </v-expand-transition>
                  </v-card>
      </template>

      <router-link to="/">Regresar</router-link>






    </div>

  </v-main>
</template>

<script>
import { mapState } from 'vuex'
export default{
  name: 'RiesgoView',
  data: ()=>{
    return {
        mostrar: true,
        valorprogress: 0,
        show: false,
        mensaje: '',
        mostraresperalarga: true,
        estiloesperalarga:{
            color: 'red',
            fontSize: '30 px',
        },
        estiloesperacorta:{
            color: 'green',
            fontSize: '20 px',
        },
    }
  },
  methods:{
      generarEsperaLarga(){


      setTimeout( ()=>{
        this.valorprogress = 20;
      }, 12000);

      setTimeout( ()=>{
        this.valorprogress = 40;
      }, 24000);

      setTimeout( ()=>{
        this.valorprogress = 60;
      }, 36000);

      setTimeout( ()=>{
        this.valorprogress = 80;
      }, 48000);



      setTimeout(()=>{

        this.mostrar=false;
      }, 60000);

      },

      generarEsperaCorta(){


      setTimeout( ()=>{
        this.valorprogress = 20;
      }, 1200);

      setTimeout( ()=>{
        this.valorprogress = 40;
      }, 2400);

      setTimeout( ()=>{
        this.valorprogress = 60;
      }, 3600);

      setTimeout( ()=>{
        this.valorprogress = 80;
      }, 4800);



      setTimeout(()=>{

        this.mostrar=false;
      }, 6000);

      },

  },
  computed:{
    ...mapState(["avesextincion"]),
  },
  created(){
    console.log('invoca created');
    if(this.avesextincion.length < 60 ){
        this.mostraresperalarga = true;
        this.mensaje="POR FAVOR ESPERE 60 SEGUNDOS MIENTRAS SE CARGA TODA LA INFORMACION";
        this.generarEsperaLarga();
    }
    else{
        this.mostraresperalarga = false;
        this.mensaje = "Por favor espere un momento"
        this.generarEsperaCorta();
    }


  }

}
</script>

<style scoped>
#espera{
  color: red;
  }

#exito{
  color: green;
}
</style>
