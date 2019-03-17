<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-12">
          <v-toolbar
            dark
            color="primary"
          >
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>
                    code
                  </v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  target="_blank"
                  @click="getTest"
                  v-on="on"
                >
                  <v-icon large>
                    mdi-codepen
                  </v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="login"
                label="Login"
                type="text"
              />
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      API_URL: ''
    };
  },
  methods: {
    getTest() {
      if (window.location.hostname === 'localhost') this.API_URL = 'http://localhost:3000';
      else this.API_URL = 'https://desafio-stone-api.herokuapp.com';
      console.log(this.API_URL);
      axios.post(`${this.API_URL}/funcrionario/findById`, {id: 1})
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
};
</script>

<style>

</style>
