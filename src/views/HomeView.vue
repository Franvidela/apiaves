<template>
          <v-main>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="birdname"
                    :rules="nameRules"
                    :counter="10"
                    label="Nombre del Ave"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >

                      <template>
                        <v-btn block
                          color="primary"
                          v-on:click="aveABuscar"
                          >
                          Buscar Ave
                        </v-btn>
                      </template>

                </v-col>



              </v-row>
            </v-container>
          </v-form>

          <DatosAve v-bind:msg="unAve" v-bind:respuesta="datoEncontrado" />

          <template v-if="mostrar">
              <div class="text-center">
                <v-progress-circular v-bind:value="valorprogress"></v-progress-circular>
              </div>
        </template>



          </v-main>


</template>

<script>
  import { mapState } from 'vuex'
  import HelloWorld from '../components/HelloWorld'
  import DatosAve from '../components/DatosAve.vue'

  export default {
    name: 'Home',

    components: {
      HelloWorld, DatosAve
    },
    data: () => ({
          mostrar: false,
          valid: false,
          birdname: '',
          unAve:'',
          valorprogress: 0,
          respuestaTemporal:'',
          datoEncontrado:'',
          nameRules: [
                v => !!v || 'Nombre del ave es requerido',
                v => v.length <= 30 || 'Nombre debe tener menos de 30 caracteres',
                    ],

                    }),
    methods:{
        // ...mapActions(["getAves"]),
        aveABuscar(){
            this.consulta();
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

            setTimeout(()=>{
              this.valorprogress = 0;
              this.unAve = this.birdname;
              this.datoEncontrado = this.respuestaTemporal;
              this.mostrar=false;
            }, 5000);

        },
        consulta(){
            this.datoEncontrado = '';
            this.respuestaTemporal='';
            console.log('Llamado a consulta()');
            for(let elave of this.lasaves){
                // console.log(elave);

                if (elave.name.spanish == this.birdname){
                    this.respuestaTemporal = elave;
                }

            }//fin for
        },
    },
    computed:{
      ...mapState(["lasaves"]),
    },
    created(){
      // this.getAves();
    }

  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
