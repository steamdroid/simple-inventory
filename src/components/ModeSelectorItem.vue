<template>
  <li
    :class="{
      'is-active': active
    }"
  >
    <a href="#" @click.prevent.self="changeActiveMode(id)">{{ name }}</a>
  </li>
</template>
<script setup>
import { useThingsStore } from '@/stores/thingsStore.js';

defineProps({
  id: String,
  name: String,
  active: Boolean
});

const store = useThingsStore();

function changeActiveMode(id) {
  store.changeActiveMode(id);
}
</script>
