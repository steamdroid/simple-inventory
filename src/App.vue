<template>
  <div class="container is-max-desktop">
    <div class="box">
      <MainHeader />
      <ThingsList :things="things" :level="0" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

import MainHeader from '@/components/MainHeader.vue';
import ThingsList from '@/components/ThingsList.vue';

const things = ref([]);

things.value = [
  { id: 1, text: 'Овощи и фрукты', marked: true, hidden: true, closed: true, items: [] },
  {
    id: 2,
    text: 'Молоко и яйца',
    marked: false,
    hidden: false,
    closed: false,
    items: [
      { id: 4, text: 'Молоко', marked: false, hidden: false },
      { id: 5, text: 'Яйца', marked: false, hidden: false }
    ]
  },
  { id: 3, text: 'Мясо и рыба', marked: true, hidden: false, closed: true, items: [] }
];
</script>

<style scoped></style>
