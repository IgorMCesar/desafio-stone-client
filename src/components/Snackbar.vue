<template>
  <v-snackbar
    v-model="snackbar"
    right
    :timeout="timeout"
    top
  >
    {{ text }}
    <v-btn
      color="pink"
      flat
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        timeout: 6000,
        text: 'Hello, I\'m a snackbar'
      }
    }
  }
</script>