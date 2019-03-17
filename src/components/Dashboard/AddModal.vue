<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Adicionar Profissional</span>
      </v-card-title>
      <v-card-text>
        <!-- <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field v-model="nome" label="Nome*" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete
                v-model="cargo"
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Cargo*"
                unique
                required
              ></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                v-model="idade"
                :items="Array.apply(null, {length: 103}).map(Number.call, Number)"
                label="Idade*"
                required
              ></v-select>
            </v-flex>
            
          </v-layout>
        </v-container>
        <small>*Indica campos que devem ser preenchidos</small> -->
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="nome"
            :rules="nomeRules"
            label="Nome"
            required
          />

          <v-select
            v-model="cargo"
            :items="cargos"
            :rules="[v => !!v || 'É necessário escolher um cargo']"
            label="Cargo"
            required
          />

          <v-select
            v-model="idade"
            :items="idades"
            :rules="[v => !!v || 'É necessário escolher uma idade']"
            label="Idade"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          flat
          @click="close()"
        >
          Fechar
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="addProfissional"
        >
          Criar
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
    dialog: Boolean,
    closeModal: Function,
  },
  data() {
    return {
      API_URL: '',
      nome: '',
      idade: '',
      cargo: '',
      valid: true,
      verified: false,
      nomeRules: [
        v => !!v || 'Nome é necessário',
        v => this.regNome(v) || 'Nome só pode possuir letras',
        v => (v && v.length <= 30) || 'Nome pode ter no máximo 30 caracteres',
        v => (v && v.length >= 2) || 'Nome deve ter no mínimo 2 caracteres'
      ],
      cargos: [
      'Dev FrontEnd',
      'Dev BackEnd',
      'Dev FullStack',
      'Quality Assurance',
      'Product Owner',
      'Scrum Master',
      'Product Designer',
      'DevOps',
      'Redes',
      ],
      idades: Array.apply(null, {length: 103}).map(Number.call, Number)
    };
  },
  created() {
    if (window.location.hostname === 'localhost') this.API_URL = 'http://localhost:3000';
    else this.API_URL = 'https://desafio-stone-api.herokuapp.com';
  },
  methods: {
    close() {
      this.reset();
      this.resetValidation();
      this.closeModal();
    },
    addProfissional() {
      this.validate();
      if(this.verified) {
        const profissional = { 
          nome: this.nome, 
          cargo: this.cargo,
          idade: this.idade
        ,};
        axios.put(`${this.API_URL}/funcionario/insert`, profissional)
        .then((resp) => {
          this.close();
        })
        .catch((err, resp) => {
          console.log(err);
          console.log(resp);
        })
      }
      
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.verified = true;
      }
    },
    reset () {
      this.$refs.form.reset();
    },
    resetValidation () {
      this.$refs.form.resetValidation();
    },

    regNome(nome) {
      var re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
      return re.test(nome);
    }
  },
};
</script>

<style>
#floating-button {
  background-color: #92c83e;
}
</style>
