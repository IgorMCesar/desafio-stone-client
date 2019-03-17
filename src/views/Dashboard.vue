<template>
  <v-container
    id="container"
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
        <Table />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import Table from '../components/Dashboard/Table.vue';

export default {
  name: 'Dashboard',
  components: {
    Table
  }
};
</script>

<style>
#container {
  background-color: #0b903d;
}
</style>
