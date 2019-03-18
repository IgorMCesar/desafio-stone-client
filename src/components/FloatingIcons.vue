<template>
  <!-- FloatingIcons component with log icon and github icon with dial redirecting to client and server git repos -->
  <div>
    <LogModal
      :modal="modal"
      :close-modal="closeModal"
    />
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
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          class="log-icon mt-5"
          fab
          dark
          top
          right
          fixed
          v-on="on"
          color="blue darken-4"
          @click="modal = !modal"
        >
          <v-icon dark>
            assignment
          </v-icon>
        </v-btn>
      </template>
      <span>Log DB</span>
    </v-tooltip>
  </div>
</template>

<script>
  import LogModal from './LogModal';
  export default {
    components: {
      LogModal
    },
    data: () => ({
      fab: false,
      modal: false,
    }),
    methods: {
      closeModal() {
        this.modal = false;
      }
    }
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

  .log-icon {
    top: 30px !important;
  }
</style>