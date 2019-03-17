<template>
  <v-container>
    <AddModal
      :dialog="dialog"
      :close-modal="closeModal"
    />
    <v-card>
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
          <td class="justify-center layout px-0">
            <!-- <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon> -->
            <v-icon
              small
              @click="deleteItem(props.item)"
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
      API_URL: '',
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
          align: 'left',
          value: 'nome',
          sortable: false
        }
      ],
      funcionarios: [],
    };
  },
  created() {
    if (window.location.hostname === 'localhost') this.API_URL = 'http://localhost:3000';
    else this.API_URL = 'https://desafio-stone-api.herokuapp.com';
    this.getAll();
  },
  methods: {
    getTest() {
      console.log(this.API_URL);
      axios.post(`${this.API_URL}/funcionario/findById`, {id: 1})
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getAll() {
      axios.get(`${this.API_URL}/funcionario/getAll`)
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
    deleteItem(funcionario){
      console.log(funcionario.id);
      if(confirm(`Tem certeza que deseja remover o funcionario ${funcionario.nome}?`)) {
        axios.delete(`${this.API_URL}/funcionario/remove`, { data: {id: funcionario.id}})
        .then((resp) => {
          console.log(resp);
          this.getAll();
        })
        .catch((err) => {
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
</style>
