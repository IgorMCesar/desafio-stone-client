<template>
  <!-- A confirmation Modal for removing a funcionario -->
  <v-dialog
    v-model="warningModal.active"
    persistent
    max-width="600px"
    class="add-border"
  >
    <v-card class="add-border">
      <v-card-title id="card-color">
        <v-icon
          id="warning-icon"
          color="black"
          large
        >
          warning
        </v-icon>
        <span class="headline">Remover Funcionario</span>
      </v-card-title>
      <v-card-text class="subheading">
        Tem certeza que deseja remover o funcionario <span class="font-weight-bold">{{ warningModal.funcionario.nome }} ({{ warningModal.funcionario.cargo }})</span> ?
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red darken-1"
          flat
          @click="close()"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="green darken-2"
          flat
          @click="deleteFuncionario"
        >
          Remover
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddModal',
  props: {
    warningModal: Object,
    closeWarningModal: Function,
  },
  methods: {
    // Close modal using props function on caller
    close() {
      this.closeWarningModal();
    },
    // Deletes a funcionario with a request sent through axios to the server, depending on success it shows a snackbar with pre-defined data
    deleteFuncionario() {
      axios.delete(`${this.$store.getters.apiUrl}/funcionario/remove`, { data: {id: this.warningModal.funcionario.id}})
        .then((resp) => {
          this.$store.dispatch('setSnackbar', {
            active: true,
            message: 'Funcionario removido com sucesso!',
            color: 'green',
          });
          this.close();
        })
        .catch((err) => {
          this.$store.dispatch('setSnackbar', {
            active: true,
            message: 'Houve um erro ao remover usuario!',
            color: 'red',
          });
          console.log(err);
        })      
    },
  },
};
</script>

<style>
.add-border {
  border-radius: 20px !important;
}

#warning-icon {
  padding-right: 16px;
}
</style>

<style scoped>

#card-color{
  background-color: #FFA000 !important;
  color: black !important;
}

</style>
