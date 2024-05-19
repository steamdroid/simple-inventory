<template>
  <li
    class="list-item"
    :class="{
      'list-item--marked': marked
    }"
  >
    <div class="list-item__wrapper py-2 mb-2">
      <button
        type="button"
        class="list-item__toggle"
        v-if="level > 0"
        @click="store.toggleItemMark(id)"
      ></button>
      <span
        class="list-item__text"
        contenteditable="true"
        @input="changeItemText(id, $el.textContent)"
        >{{ text }}</span
      >
      <div class="list-item__actions ml-auto">
        <button
          type="button"
          class="list-item__actions-btn"
          v-if="level > 0"
          :title="hiddenText"
          @click="store.toggleItemHide(id)"
        >
          <i :class="hiddenClass"></i>
        </button>
        <button
          type="button"
          class="list-item__actions-btn list-item__actions-btn--remove"
          title="Удалить"
          @click="store.removeItem(id)"
        >
          <i class="gg-trash"></i>
        </button>
        <button
          type="button"
          class="list-item__actions-btn"
          v-if="level < 1"
          @click="store.toggleItemClose(id)"
        >
          <i :class="closed ? 'gg-chevron-down' : 'gg-chevron-up'"></i>
        </button>
      </div>
    </div>
    <ThingsList :things="items" :parent="id" :level="level + 1" />
  </li>
</template>
<script setup>
import { computed } from 'vue';
import { useThingsStore } from '@/stores/thingsStore.js';
import ThingsList from '@/components/ThingsList.vue';

const props = defineProps({
  id: Number,
  text: String,
  marked: Boolean,
  closed: Boolean,
  hidden: Boolean,
  items: Array || undefined,
  level: Number
});

const hiddenClass = computed(() => {
  return props.hidden ? 'gg-eye' : 'gg-eye-alt';
});

const hiddenText = computed(() => {
  return props.hidden ? 'Показать' : 'Скрыть';
});

const store = useThingsStore();

function changeItemText(id, text) {
  store.changeItemText(id, text);
}
</script>
<style lang="scss" scoped>
@import '@/../node_modules/css.gg/icons/scss/chevron-down.scss';
@import '@/../node_modules/css.gg/icons/scss/chevron-up.scss';
@import '@/../node_modules/css.gg/icons/scss/eye.scss';
@import '@/../node_modules/css.gg/icons/scss/eye-alt.scss';
@import '@/../node_modules/css.gg/icons/scss/trash.scss';

.list-item {
  &__toggle {
    display: block;
    width: 0.5em;
    height: 0.5em;
    padding: 0.5em;
    line-height: 1em;
    border: 1px solid var(--bulma-text);
    border-radius: 50%;
    margin-right: 1em;
  }

  &__text {
    outline: none;
    width: 100%;
  }

  &__wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid var(--bulma-text);
  }

  &__actions {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  &__actions-btn--remove:last-child {
    margin-right: 0.5em;
  }

  &--marked .list-item__toggle {
    background-color: var(--bulma-text);
  }

  &--marked .list-item__text {
    text-decoration: line-through;
  }
}
</style>
