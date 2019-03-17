<template>
  <!-- Global snackbar component, keeps watching store snackbar state, if it changes se it to the values recived with a timeout of 6 sec  -->
  <v-snackbar
    v-model="snackbar"
    center
    top
    :color="color"
  >
    {{ message }}
    <v-btn
      color="white"
      flat
      @click="close"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: '',
        message: '',
        color: ''
      }
    },
    computed: {
      verify() {
        return this.$store.getters.snackbar;
      }
    },
    watch: {
      verify(val) {
        this.snackbar = val.active;
        this.message = val.message;
        this.color = val.color;
        if(this.snackbar.active) setTimeout(() =>{
          this.$store.dispatch('resetSnackbar');
        }, 6000);
      }
    },
    methods: {
      close() {
        this.$store.dispatch('resetSnackbar');
      }
    }
  }
</script>