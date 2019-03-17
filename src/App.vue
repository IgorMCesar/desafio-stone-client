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
      <!-- <Login /> -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import DisclaimerModal from './components/DisclaimerModal';

export default {
  name: 'App',
  components: {
    DisclaimerModal
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style scoped>

#logo {
  width: 100px;
}

</style>
