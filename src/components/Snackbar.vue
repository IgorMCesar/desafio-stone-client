<template>
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
        message: 'Hello, I\'m a snackbar',
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