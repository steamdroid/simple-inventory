<template>
  <header class="mb-6">
    <div class="select">
      <select name="listName">
        <option>Продукты</option>
      </select>
    </div>
    <div class="tabs is-centered ml-auto">
      <ul>
        <li class="is-active"><a>В наличии</a></li>
        <li><a>Отсутствуют</a></li>
        <li><a>Все</a></li>
      </ul>
    </div>
  </header>
</template>
<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}
</style>
