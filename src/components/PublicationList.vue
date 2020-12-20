<template>
  <div class="container">
    <h1>Publications</h1>
    <a-card class="publication" v-for="item in name" :key="item.id">
      {{ item.text }}
      <div v-if="item.deadline">
        <div v-if="item.deadline.slice(0, 4) === 4000">
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

import { mapGetters } from 'vuex';
import { GET_PUBLICATIONS } from '@/store/action-types';
import store from '../store/index';
import 'ant-design-vue/dist/antd.css';

export default {
  name: 'publicationList',
  store,
  computed: {
    ...mapGetters([
      'publications',
    ]),
    name() {
      console.log(this.publications);
      return this.publications;
    },
  },
  mounted() {
    this.$store.dispatch(GET_PUBLICATIONS);
  },
};
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
