import axios from 'axios';
import {
  GET_PUBLICATIONS,
  GET_STUDENT_PUBLICATIONS, POST_SUBMISSION,
  SWAP_CALENDAR_STATE, UPLOAD_FILE,
} from '@/store/action-types';
import { SAVE_FILE, SET_CALENDAR_STATE, SET_PUBLICATIONS } from '@/store/mutation-types';
import { ApiService } from '@/services/api-service';

interface State {
  publications: object[] | null;
  visible: boolean;
  uploadFile: any | null;
}

const store: State = {
  publications: [],
  visible: false,
  uploadFile: null,
};

const getters = {
  publications(state: State) {
    return state.publications;
  },
  visible(state: State) {
    return state.visible;
  },
  uploadFile(state: State) {
    return state.uploadFile;
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
  async [UPLOAD_FILE](context: any, file: any) {
    context.commit(SAVE_FILE, file);
  },
  async [POST_SUBMISSION](context: any, file: any) {
    console.log('post submission');
    console.log(context.state.uploadFile);
    console.log(file);
    const XHR = new XMLHttpRequest();
    const FD = new FormData();
    FD.append('file', file);
    FD.append('model', 'modelName');
    XHR.open('POST', 'http://localhost:5000/api/submissions/test');
    XHR.send(FD);
  },
};

const mutations = {
  [SET_PUBLICATIONS]: (state: State, publications: object[]) => {
    state.publications = publications;
  },
  [SET_CALENDAR_STATE]: (state: State) => {
    state.visible = !state.visible;
  },
  [SAVE_FILE]: (state: State, file: object) => {
    state.uploadFile = file;
  },
};

export default {
  state: store,
  getters,
  actions,
  mutations,
};
