<template>
  <header class="mb-6">
    <button type="button" class="underline-dashed" @click="store.toggleAllMark">
      Отметить/снять всё
    </button>
    <div class="tabs is-centered ml-auto">
      <ul>
        <ModeSelectorItem
          v-for="mode in store.modes"
          :id="mode.id"
          :name="mode.name"
          :active="mode.active"
          :key="mode.id"
        />
      </ul>
    </div>
  </header>
</template>
<script setup>
import ModeSelectorItem from '@/components/ModeSelectorItem.vue';
import { useThingsStore } from '@/stores/thingsStore.js';

const store = useThingsStore();
</script>
<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}
.underline-dashed {
  border-bottom: 1px dashed var(--bulma-text);
}
</style>
