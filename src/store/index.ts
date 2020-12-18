import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numOfAssignments: 1,
    publications: [],
  },
  mutations: {
    increment(state) {
      state.numOfAssignments += 1;
      console.log(state.numOfAssignments);
    },
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
