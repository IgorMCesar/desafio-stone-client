<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="350"
  >
    <v-card>
      <v-card-text>Esse site não possui vinculo nenhum com a Stone, é apenas um desafio proposto a mim pela empresa.</v-card-text>
      <v-card-text>O site aqui presente se isenta dos direitos de imagens utilizados, sendo de total autoria e responsabilidade de @Stone.</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          flat
          @click="dialog = false"
        >
          Concordo
        </v-btn>
        <v-btn
          color="red darken-1"
          flat
          href="https://www.stone.com.br/"
        >
          Não concordo
        </v-btn>
      </v-card-actions>
      <small>*Não concordar te redirecionará para o site real da Stone</small>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: true
      }
    }
  }
</script>