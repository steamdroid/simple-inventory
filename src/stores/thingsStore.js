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

  const globalMarkState = ref(false);

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
    data.value = [
      ...data.value,
      {
        id: data.value.reduce((acc, { id }) => (acc > id ? acc : id), 0) + 1,
        text: '',
        parent: parent,
        marked: false,
        closed: null
      }
    ];
  }

  function removeItem(id) {
    data.value = data.value.filter((item) => item.id !== id && item.parent !== id);
  }

  function findItemById(id) {
    return data.value.find((item) => item.id === id);
  }

  function changeItemText(id, text) {
    data.value = data.value.map((item) => {
      if (item.id === id) {
        item.text = text;
      }
      return item;
    });
  }

  function toggleItemMark(id) {
    let markState = null;

    data.value = data.value.map((item) => {
      if (item.id === id) {
        item.marked = !item.marked;
        markState = item.marked;
      }
      return item;
    });

    data.value = data.value.map((item) => {
      if (item.parent === id) {
        item.marked = markState;
      }
      return item;
    });
  }

  function toggleAllMark() {
    globalMarkState.value = !globalMarkState.value;

    data.value = data.value.map((item) => {
      item.marked = globalMarkState.value;
      return item;
    });
  }

  function toggleItemClose(id) {
    data.value = data.value.map((item) => {
      if (item.id === id) {
        item.closed = !item.closed;
      }
      return item;
    });
  }

  function toggleItemHide(id) {
    data.value = data.value.map((item) => {
      if (item.id === id) {
        item.hidden = !item.hidden;
      }
      return item;
    });
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
    toggleItemHide,
    toggleAllMark
  };
});
