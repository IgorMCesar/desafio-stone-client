<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    fixed
    direction="top"
    open-on-hover
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="black"
        dark
        fab
      >
        <font-awesome-icon
          id="git-icon"
          :icon="[ 'fab', 'github']"
        />
        <v-icon>close</v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      color="gray darken-1"
      href="https://github.com/IgorMCesar/desafio-stone-client"
      target="_blank"
    >
      Client
    </v-btn>
    <v-btn
      fab
      dark
      color="gray darken-1"
      href="https://github.com/IgorMCesar/desafio-stone-server"
      target="_blank"
    >
      Server
    </v-btn>
  </v-speed-dial>
</template>

<script>
  export default {
    data: () => ({
      fab: false,
    }),

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'class': 'purple', icon: 'account_circle' }
          case 'two': return { 'class': 'red', icon: 'edit' }
          case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    },
  }
</script>

<style>
  #git-icon{
    font-size: 58px;
    bottom: 15px;
    right: 15px;
    position: fixed;
    top: initial !important;
    left: initial !important;
  }
</style>