<template>
  <ul
    class="list"
    :class="{
      'list--nested': level > 0,
      'list--open': !store.getClosedStateById(parent)
    }"
  >
    <ThingsListItem
      v-for="thing in things"
      :key="thing.id"
      :text="thing.text"
      :closed="thing.closed"
      :marked="thing.marked"
      :hidden="thing.hidden"
      :items="thing.items"
      :id="thing.id"
      :level="level"
    />
    <li v-if="level < 2">
      <button class="add-button" type="button" @click="store.addEmptyItem(parent || null)">
        <i class="gg-math-plus"></i> Добавить
      </button>
    </li>
  </ul>
</template>
<script setup>
import { useThingsStore } from '@/stores/thingsStore.js';
import ThingsListItem from '@/components/ThingsListItem.vue';

defineProps({
  parent,
  things: Array,
  level: Number
});

const store = useThingsStore();
</script>
<style scoped>
@import '@/../node_modules/css.gg/icons/scss/math-plus.scss';
.list {
  height: 0;
  overflow: hidden;
}

.list--open {
  height: 100%;
}
.list--nested {
  margin-left: 2em;
}

.add-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-top: 0.5em;
  padding-bottom: 1.5em;
}
</style>
