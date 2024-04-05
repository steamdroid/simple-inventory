<template>
  <div class="container is-max-desktop">
    <div class="box">
      <MainHeader />
      <ThingsList :things="things" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

import MainHeader from './components/MainHeader.vue';
import ThingsList from './components/ThingsList.vue';

const things = ref([]);

things.value = [
  { id: 1, text: 'Овощи и фрукты', marked: true, hidden: true, items: [] },
  { id: 2, text: 'Молоко и яйца', marked: false, hidden: false, items: [] },
  { id: 3, text: 'Мясо и рыба', marked: true, hidden: false, items: [] }
];
</script>

<style scoped></style>
