<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <img
          id="logo"
          src="./assets/logo-stone.png"
          alt=""
        >
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        href="https://www.stone.com.br/"
        target="_blank"
        color="green lighten-2"
      >
        <span class="mr-2">Ir até o site real da Stone</span>
      </v-btn>
    </v-toolbar>
    
    <v-content>
      <DisclaimerModal />
      <Snackbar />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import DisclaimerModal from './components/DisclaimerModal';
import Snackbar from './components/Snackbar';


export default {
  name: 'App',
  components: {
    DisclaimerModal,
    Snackbar
  },
  data() {
    return {
      //
    };
  },
  created() {
    let API_URL = '';
    if (window.location.hostname === 'localhost') API_URL = 'http://localhost:3000';
    else API_URL = 'https://desafio-stone-api.herokuapp.com';
    this.$store.dispatch('setApiUrl', API_URL);
  },
};
</script>

<style scoped>

#logo {
  width: 100px;
}

</style>
