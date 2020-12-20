import Vue from 'vue';
import Vuex from 'vuex';
import publication from '@/store/modules/publication.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    publication,
  },
});
