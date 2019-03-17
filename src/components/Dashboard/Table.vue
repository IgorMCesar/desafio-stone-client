<template>
  <!-- Table modal with all funcionarios of the DB -->
  <v-container>
    <AddModal
      :dialog="dialog"
      :close-modal="closeModal"
    />
    <WarningModal 
      :warning-modal="warningModal"
      :close-warning-modal="closeWarningModal"
    />
    <v-card id="table-card">
      <v-card-title>
        <v-btn
          id="floating-button"
          fab
          medium
          bottom
          left
          absolute
          @click="dialog = !dialog"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-layout>
          <v-flex xs5>
            <h2>Funcionarios</h2>
          </v-flex>
          <v-flex
            xs5
            offset-xs2
          >
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            />
          </v-flex>
        </v-layout>
      </v-card-title>
      
      <v-data-table
        :headers="headers"
        :items="funcionarios"
        :search="search"
        no-data-text="Nenhum funcionario adicionado!"
      >
        <template v-slot:items="props">
          <td>{{ props.item.nome }}</td>
          <td class="text-xs-right">
            {{ props.item.idade }}
          </td>
          <td class="text-xs-right">
            {{ props.item.cargo }}
          </td>
          <td class="text-xs-right">
            <!-- <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon> -->
            <v-icon
              small
              @click="openWarningModal(props.item)"
            >
              delete
            </v-icon>
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
  </v-container>
</template>

<script>
import axios from 'axios';
import AddModal from './AddModal';
import WarningModal from './WarningModal';

export default {
  name: 'Table',
  components: {
    AddModal,
    WarningModal
  },
  data() {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Nome',
          align: 'left',
          value: 'nome'
        },
        {
          text: 'Idade',
          align: 'right',
          value: 'idade'
        },
        {
          text: 'Cargo',
          align: 'right',
          value: 'cargo'
        },
        {
          text: 'Remover',
          align: 'right',
          value: 'nome',
          sortable: false
        }
      ],
      funcionarios: [],
      warningModal: {
        active: false,
        funcionario: '',
      },
    };
  },
  // When Table Component is created on Vue lifecycle get all funcionarios using axios request to the server
  created() {
    this.getAll();
  },
  methods: {
    getTest() {
      axios.post(`${this.$store.getters.apiUrl}/funcionario/findById`, {id: 1})
      .then((resp) => {
        console.log(resp);
        
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getAll() {
      axios.get(`${this.$store.getters.apiUrl}/funcionario/getAll`)
      .then((resp) => {
        this.funcionarios = resp.data;
      })
      .catch((err) => {
        console.log(err);
      })
    },
    closeModal(){
      this.dialog = false;
      this.getAll();
    },
    openWarningModal(funcionario) {
      this.warningModal = {
        active: true,
        funcionario,
      }
    },
    closeWarningModal(){
      this.warningModal = {
        active: false,
        funcionario: '',
      }
      this.getAll();
    },
  },
};
</script>

<style>
#floating-button {
  background-color: #92c83e;
}

.v-datatable__actions {
  border-radius: 20px !important;
}
#table-card {
  border-radius: 20px !important;
}
.theme--light.v-table {
  border-radius: 20px !important;
}
</style>
