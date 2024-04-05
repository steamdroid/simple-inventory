<template>
  <ul class="list">
    <ThingsListItem
      v-for="thing in things"
      :key="thing.id"
      :text="thing.text"
      :marked="thing.marked"
    />
  </ul>
</template>
<script setup>
import ThingsListItem from './ThingsListItem.vue';

defineProps({
  things: Array
});
</script>
<style scoped>
.list--nested {
  margin-left: 2em;
}
</style>
