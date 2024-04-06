<template>
  <div class="container is-max-desktop">
    <div class="box">
      <MainHeader />
      <ThingsList :things="store.things" :level="0" />
    </div>
  </div>
</template>
<script setup>
import { useThingsStore } from '@/stores/thingsStore.js';

import MainHeader from '@/components/MainHeader.vue';
import ThingsList from '@/components/ThingsList.vue';

const store = useThingsStore();
</script>

<style scoped></style>
