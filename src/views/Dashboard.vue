<template>
  <v-container
    id="container"
    fluid
    fill-height
  >
    <FloatingDial />
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
import Table from '../components/Dashboard/Table.vue';
import FloatingDial from '../components/FloatingDial';

export default {
  name: 'Dashboard',
  components: {
    Table,
    FloatingDial
  }
};
</script>

<style>
#container {
  background-color: #0b903d;
}
</style>
