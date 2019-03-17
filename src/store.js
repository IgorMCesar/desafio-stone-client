import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: '',
    snackbar: {
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
    }
  },
  actions: {
    setSnackbar ({commit}, payload) {
      commit('SET_SNACKBAR', payload);
    },
    setApiUrl ({commit}, payload) {
      commit('SET_APIURL', payload);
    }
  },
});
