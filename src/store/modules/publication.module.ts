import axios from 'axios';
import {
  GET_PUBLICATIONS,
  GET_STUDENT_PUBLICATIONS,
  SWAP_CALENDAR_STATE,
} from '@/store/action-types';
import { SET_CALENDAR_STATE, SET_PUBLICATIONS } from '@/store/mutation-types';
import { ApiService } from '@/services/api-service';

interface State {
  publications: object[] | null;
  visible: boolean;
}

const store: State = {
  publications: [],
  visible: false,
};

const getters = {
  publications(state: State) {
    return state.publications;
  },
  visible(state: State) {
    return state.visible;
  },
};

const actions = {
  async [GET_PUBLICATIONS](context: any) {
    ApiService.get('publications')
      .then((response) => {
        context.commit(SET_PUBLICATIONS, response.data);
      });
  },
  async [GET_STUDENT_PUBLICATIONS](context: any, id: bigint) {
    ApiService.get(`publications/student/${id}`)
      .then((response) => {
        context.commit(SET_PUBLICATIONS, response.data);
      });
  },
  async [SWAP_CALENDAR_STATE](context: any) {
    context.commit(SET_CALENDAR_STATE);
  },
};

const mutations = {
  [SET_PUBLICATIONS]: (state: State, publications: object[]) => {
    state.publications = publications;
  },
  [SET_CALENDAR_STATE]: (state: State) => {
    state.visible = !state.visible;
  },
};

export default {
  state: store,
  getters,
  actions,
  mutations,
};
