<template>
  <ul
    class="list"
    :class="{
      'list--nested': nested
    }"
  >
    <ThingsListItem
      v-for="thing in things"
      :key="thing.id"
      :text="thing.text"
      :marked="thing.marked"
      :items="thing.items"
    />
  </ul>
</template>
<script setup>
import ThingsListItem from '@/components/ThingsListItem.vue';

defineProps({
  things: Array,
  nested: Boolean
});
</script>
<style scoped>
.list--nested {
  margin-left: 2em;
}
</style>
