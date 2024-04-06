<template>
  <li
    :class="{
      'is-active': active
    }"
  >
    <a :data-id="id" @click.prevent.self="store.changeActiveMode">{{ name }}</a>
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
</script>
