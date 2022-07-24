import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      lasaves:[],
      mapaaves:{},
      avesextincion:[],
  },
  getters: {
  },
  mutations: {
    changeLasAves(state, ave ){
      state.lasaves.push(ave);
    },
    changeMapaAve(state, datosmapa){
      state.mapaaves = datosmapa;
    },
    changeExtincion(state, aveextincion){
      state.avesextincion.push(aveextincion);
    },
  },
  actions: {
          async getAves({ commit }){
          const res = await fetch("https://aves.ninjas.cl/api/birds");
          const json = await res.json();
          console.log(json);
          for(let ave of json){
            commit("changeLasAves", ave);
          }
        },

        async getMap({ commit } , ruta){
          console.log('llamando a geMap, ruta=>');
          console.log(ruta);
          const res = await fetch(ruta);
          const json = await res.json();
          console.log('CONSUMO DE LA API DEL MAPA: ');
          console.log(json);
          commit("changeMapaAve", json);
        },

        async getExtincion({ commit }){
        const res = await fetch("https://aves.ninjas.cl/api/birds");
        const json = await res.json();
        console.log(json);
        for(let ave of json){
          const res2 = await fetch(ave._links.self);
          const json2 = await res2.json();
          // console.log('El json2: ');
          // console.log(json2);

                  if(json2.iucn.title == 'Menor riesgo (LC)'){
                      // console.log(json2)
                      commit("changeExtincion", json2);
                  }

           }
        },



  },
  modules: {
  }
})
