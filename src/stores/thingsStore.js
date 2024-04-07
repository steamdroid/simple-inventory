import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useThingsStore = defineStore('things', () => {
  const data = ref([]);

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

  function getDataFromStorage() {
    const storageData = localStorage.getItem('data');

    if (storageData) {
      data.value = JSON.parse(storageData);
    }
  }

  function saveDataToStorage() {
    localStorage.setItem('data', JSON.stringify(data.value));
  }

  getDataFromStorage();

  watch(data, () => {
    saveDataToStorage();
  });

  const activeMode = computed(() => {
    return modes.value.find((mode) => mode.active);
  });

  function changeActiveMode(id) {
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
      if (activeMode.id === 'all') {
        return true;
      }

      if (item.hidden) {
        return false;
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

    saveDataToStorage();
  }

  function removeItem(id) {
    data.value = data.value.filter((item) => item.id !== id && item.parent !== id);

    saveDataToStorage();
  }

  function findItemById(id) {
    return data.value.find((item) => item.id === id);
  }

  function findItemChildren(id) {
    const children = data.value.filter((item) => item.parent === id);

    return children.length ? children : null;
  }

  function changeItemText(id, text) {
    const item = findItemById(id);
    item.text = text;
  }

  function toggleItemMark(id) {
    const item = findItemById(id);
    item.marked = !item.marked;

    const children = findItemChildren(id);
    if (children !== null) {
      children.forEach((el) => {
        el.marked = item.marked;
      });
    }
  }

  function toggleItemClose(id) {
    const item = findItemById(id);
    item.closed = !item.closed;
  }

  function toggleItemHide(id) {
    const item = findItemById(id);
    item.hidden = !item.hidden;
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
    getClosedStateById,
    toggleItemHide
  };
});
