<template>
  <!-- Component to add new funcionarios -->
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    class="add-border"
  >
    <v-card class="add-border">
      <v-card-title id="card-color">
        <v-icon
          id="add-icon"
          color="white"
          large
        >
          person_add
        </v-icon>
        <span class="headline">Adicionar Funcionario</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="validForm"
          lazy-validation
        > 
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex
                xs12
                sm12
              >
                <v-text-field
                  v-model="nome"
                  :rules="nomeRules"
                  label="Nome"
                  required
                />
              </v-flex>
              <v-flex
                xs12
                sm8
              >
                <v-select
                  v-model="cargo"
                  :items="cargos"
                  :rules="[v => !!v || 'É necessário escolher um cargo']"
                  label="Cargo"
                  required
                />
              </v-flex>
              <v-flex
                xs12
                sm4
              >
                <v-select
                  v-model="idade"
                  :items="idades"
                  :rules="[v => !!v || 'É necessário escolher uma idade']"
                  label="Idade"
                  required
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red darken-1"
          flat
          @click="close()"
        >
          Fechar
        </v-btn>
        <v-btn
          color="green darken-2"
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
      nome: '',
      idade: '',
      cargo: '',
      validForm: true,
      verifiedForm: false,
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
  methods: {
    close() {
      this.reset();
      this.resetValidation();
      this.closeModal();
    },
    addProfissional() {
      this.validate();
      if(this.verifiedForm) {
        const profissional = { 
          nome: this.nome, 
          cargo: this.cargo,
          idade: this.idade
        ,};
        axios.put(`${this.$store.getters.apiUrl}/funcionario/insert`, profissional)
        .then((resp) => {
          this.$store.dispatch('setSnackbar', {
            active: true,
            message: 'Funcionario adicionado com sucesso!',
            color: 'green',
          });
          this.close();
        })
        .catch((err, resp) => {
          this.$store.dispatch('setSnackbar', {
            active: true,
            message: 'Houve um erro, funcionario não pode ser adicionado!',
            color: 'red',
          });
          console.log(err);
          console.log(resp);
        })
      }
      
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.verifiedForm = true;
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

.add-border {
  border-radius: 20px !important;
}

#card-color{
  background-color: #268a18f2;
  color: white;

}

#add-icon {
  padding-right: 16px;
}
</style>
