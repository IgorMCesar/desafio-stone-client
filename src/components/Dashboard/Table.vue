<template>
  <v-container>
    <AddModal
      :dialog="dialog"
      :close-modal="closeModal"
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
              id="search"
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
              @click="deleteFuncionario(props.item)"
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
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import AddModal from './AddModal';

export default {
  name: 'Table',
  components: {
    AddModal,
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
    };
  },
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
    deleteFuncionario(funcionario){
      console.log(funcionario.id);
      if(confirm(`Tem certeza que deseja remover o funcionario ${funcionario.nome}?`)) {
        axios.delete(`${this.$store.getters.apiUrl}/funcionario/remove`, { data: {id: funcionario.id}})
        .then((resp) => {
          this.$store.dispatch('setSnackbar', {
            active: true,
            message: 'Funcionario removido com sucesso!',
            color: 'green',
          });
          this.getAll();
        })
        .catch((err) => {
          this.$store.dispatch('setSnackbar', {
            active: true,
            message: 'Houve um erro ao remover usuario!',
            color: 'red',
          });
          console.log(err);
        })
      }
    }
  },
};
</script>

<style>
#floating-button {
  background-color: #92c83e;
}

#search {
  
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
