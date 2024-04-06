<template>
  <div class="container is-max-desktop">
    <div class="box">
      <MainHeader />
      <ThingsList :things="things" :level="0" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

import MainHeader from '@/components/MainHeader.vue';
import ThingsList from '@/components/ThingsList.vue';

const data = [
  { id: 1, text: 'Овощи и фрукты', marked: false, closed: true, parent: null },
  { id: 2, text: 'Молоко и яйца', marked: false, closed: true, parent: null },
  { id: 3, text: 'Мясо и рыба', marked: false, closed: true, parent: null },
  { id: 4, text: 'Молоко', marked: false, parent: 2 },
  { id: 5, text: 'Яйца', marked: true, parent: 2 }
];

const things = computed(() => {
  const thingsObj = data.reduce((acc, item) => {
    if (item.parent === null) {
      acc[item.id] = item;
    } else if (acc[item.parent]?.items?.length) {
      acc[item.parent].items.push(item);
    } else {
      acc[item.parent].items = [item];
    }

    return acc;
  }, {});

  return Object.values(thingsObj);
});
</script>

<style scoped></style>
