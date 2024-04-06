import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useThingsStore = defineStore('things', () => {
  const data = ref([
    { id: 1, text: 'Овощи и фрукты', closed: true, parent: null },
    { id: 2, text: 'Молоко и яйца', closed: true, parent: null },
    { id: 3, text: 'Мясо и рыба', closed: true, parent: null },
    { id: 4, text: 'Молоко', marked: false, closed: null, parent: 2 },
    { id: 5, text: 'Яйца', marked: true, closed: null, parent: 2 }
  ]);

  const modes = ref([
    {
      id: 'inStock',
      name: 'В наличии',
      active: true
    },
    {
      id: 'absent',
      name: 'Отсутствуют',
      active: false
    },
    {
      id: 'all',
      name: 'Все',
      active: false
    }
  ]);

  const activeMode = computed(() => {
    return modes.value.find((mode) => mode.active);
  });

  function changeActiveMode(evt) {
    const id = evt.target.dataset.id;
    modes.value = modes.value.map((mode) => {
      mode.active = mode.id === id ? true : false;
      return mode;
    });
  }

  function getThingsTree(data) {
    const thingsObj = data.reduce((acc, item) => {
      if (!item.parent) {
        acc[item.id] = { ...item };
      } else if (acc[item.parent]?.items?.length) {
        acc[item.parent].items = [...acc[item.parent].items, { ...item }];
      } else if (typeof acc[item.parent] !== 'undefined') {
        acc[item.parent].items = [{ ...item }];
      }

      return acc;
    }, {});

    return Object.values(thingsObj);
  }

  function filterByMode(data, activeMode) {
    return data.filter((item) => {
      if (item.parent === null || activeMode.id === 'all') {
        return true;
      }
      return activeMode.id === 'inStock' ? !item.marked : item.marked;
    });
  }

  const things = computed(() => {
    const filteredThings = filterByMode(data.value, activeMode.value);
    const thingsTree = getThingsTree(filteredThings);

    return thingsTree;
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

  function findItemById(id) {
    return data.value.find((item) => item.id === id);
  }

  function changeItemText(evt) {
    const id = +evt.target.dataset.id;
    const text = evt.target.textContent;
    const item = findItemById(id);
    item.text = text;
  }

  function toggleItemMark(id) {
    const item = findItemById(id);
    item.marked = !item.marked;
  }

  function toggleItemClose(id) {
    const item = findItemById(id);
    item.closed = !item.closed;
  }

  function getClosedStateById(id = null) {
    if (id === null) {
      return;
    }
    const item = findItemById(id);
    return item.closed;
  }

  return {
    data,
    things,
    modes,
    changeActiveMode,
    addEmptyItem,
    removeItem,
    changeItemText,
    toggleItemMark,
    toggleItemClose,
    getClosedStateById
  };
});
