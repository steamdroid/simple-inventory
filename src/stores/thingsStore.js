import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useThingsStore = defineStore('things', () => {
  const data = ref([
    { id: 1, text: 'Овощи и фрукты', marked: false, closed: true, parent: null },
    { id: 2, text: 'Молоко и яйца', marked: false, closed: true, parent: null },
    { id: 3, text: 'Мясо и рыба', marked: false, closed: true, parent: null },
    { id: 4, text: 'Молоко', marked: false, closed: null, parent: 2 },
    { id: 5, text: 'Яйца', marked: true, closed: null, parent: 2 }
  ]);

  const things = computed(() => {
    const thingsObj = data.value.reduce((acc, item) => {
      if (item.parent === null || item.parent === undefined) {
        acc[item.id] = { ...item };
      } else if (acc[item.parent]?.items?.length) {
        acc[item.parent].items = [...acc[item.parent].items, { ...item }];
      } else {
        acc[item.parent].items = [{ ...item }];
      }

      return acc;
    }, {});

    return Object.values(thingsObj);
  });

  function addEmptyItem(parent = null) {
    data.value.push({
      id: data.value.reduce((acc, { id }) => (acc > id ? acc : id), 0) + 1,
      text: '',
      parent: parent,
      marked: false,
      closed: null
    });
  }

  function removeItem(id) {
    data.value = data.value.filter((item) => item.id !== id);
  }

  return { data, things, addEmptyItem, removeItem };
});
