<template>
  <div class="container">
    <h1>Publications</h1>
    <a-card class="publication" v-for="item in getPublications" :key="item.text">
      {{ item.text }}
      <div v-if="item.deadline">
        <div v-if="item.deadline.slice(0, 4) == 4000">
          deadline didn't settled
        </div>
        <div v-else>
          Due to: {{ item.deadline.slice(0, 10) }}
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>

import Vue from 'vue';
import store from '../store/index';
import 'ant-design-vue/dist/antd.css';

export default Vue.extend({
  name: 'publicationList',
  store,
  props: {
    message: String,
  },
  mounted() {
    store.commit('getData');
  },
  computed: {
    getPublications() {
      return this.$store.state.publications;
    },
  },
});
</script>

<style>
  .container {
    margin: auto;
    width: 90%;
  }
  .publication {
    width: 50%;
    margin: 2rem auto;
  }
</style>
