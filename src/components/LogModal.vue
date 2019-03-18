<template>
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="modal"
      dark
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="blue darken-4"
        >
          <v-btn
            icon
            dark
            @click="closeModal"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Log DB</v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="logs"
          :search="search"
          dark
          hide-actions
          disable-initial-sort
          :pagination.sync="pagination"
          no-data-text="Nenhum log existente!"
        >
          <template v-slot:items="props">
            <td>{{ props.item.timestamp }}</td>
            <td class="text-xs-right">
              {{ props.item.acao }}
            </td>
            <td class="text-xs-right">
              {{ props.item.id_funcionario }}
            </td>
            <td class="text-xs-right">
              {{ props.item.nome }}
            </td>
            <td class="text-xs-right">
              {{ props.item.idade }}
            </td>
            <td class="text-xs-right">
              {{ props.item.cargo }}
            </td>
          </template>
          <v-alert
            v-slot:no-results
            :value="true"
            color="error"
            icon="warning"
          >
            Sua busca por "{{ search }}" não obeteve resultados.
          </v-alert>
        </v-data-table>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import axios from 'axios';
  export default {
    props: {
      modal: Boolean,
      closeModal: Function,
    },
    data () {
      return {
        headers: [
          {
            text: 'Timestamp',
            align: 'left',
            value: 'timestamp',
            sortable: false
          },
          {
            text: 'Ação',
            align: 'right',
            value: 'acao',
            sortable: false
          },
          {
            text: 'ID do Funcionario',
            align: 'right',
            value: 'id_funcionario',
            sortable: false
          },
          {
            text: 'Nome',
            align: 'right',
            value: 'nome',
            sortable: false
          },
          {
            text: 'Idade',
            align: 'right',
            value: 'idade',
            sortable: false
          },
          {
            text: 'Cargo',
            align: 'right',
            value: 'cargo',
            sortable: false
          },
        ],
        logs: [],
        search: '',
        pagination: {
          sortBy: 'timestamp',
          rowsPerPage: -1,
        },
      }
    },
    watch: {
      modal(val){
        if(val) this.getAll();
      }
    },
    // When Table Component is created on Vue lifecycle get all funcionarios using axios request to the server
    created() {
      this.getAll();
      this.pagination.descending = true;
    },
    methods: {
      getAll() {
        axios.get(`${this.$store.getters.apiUrl}/log/getAll`)
        .then((resp) => {
          this.logs = resp.data;
        })
        .catch((err) => {
          console.log(err);
        })
      },
    }
  }
</script>