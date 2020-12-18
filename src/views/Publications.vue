<template>
  <div class="Publications">
    <PublicationList message="Some text" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PublicationList from '@/components/PublicationList.vue';

export default Vue.extend({
  name: 'Publications',
  components: {
    PublicationList,
  },
});
</script>
