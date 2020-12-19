import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    publications: [],
  },
  mutations: {
    getData(state) {
      axios
        .get('http://localhost:5000/api/publications')
        .then((response) => {
          state.publications = response.data;
        });
    },
  },
  actions: {
  },
  modules: {
  },
});
