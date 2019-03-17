import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: '',
    snackbar: {
      active: false,
      message: '',
      color: '',
    }
  },
  getters: {
    snackbar: state => state.snackbar,
    apiUrl: state => state.apiUrl
  },
  mutations: {
    SET_SNACKBAR (state, payload) {
      state.snackbar = payload;
    },
    SET_APIURL (state, payload) {
      state.apiUrl = payload;
    },
    RESET_SNACKBAR (state) {
      state.snackbar = {
        active: false,
        message: '',
        color: '',
      }
    }
  },
  actions: {
    setSnackbar ({commit}, payload) {
      commit('SET_SNACKBAR', payload);
    },
    resetSnackbar ({commit}) {
      commit('RESET_SNACKBAR');
    },
    setApiUrl ({commit}, payload) {
      commit('SET_APIURL', payload);
    }
  },
});
