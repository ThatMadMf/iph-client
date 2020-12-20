import axios from 'axios';
import { GET_PUBLICATIONS } from '@/store/action-types';
import { SET_PUBLICATIONS } from '@/store/mutation-types';

interface State {
  publications: object[] | null;
}

const store: State = {
  publications: [],
};

const getters = {
  publications(state: State) {
    return state.publications;
  },
};

const actions = {
  async [GET_PUBLICATIONS](context: any) {
    axios
      .get('http://localhost:5000/api/publications')
      .then((response) => {
        context.commit(SET_PUBLICATIONS, response.data);
      });
  },
};

const mutations = {
  [SET_PUBLICATIONS]: (state: State, publications: object[]) => {
    state.publications = publications;
  },
};

export default {
  state: store,
  getters,
  actions,
  mutations,
};
