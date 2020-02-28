<template lang="html">

  <div v-for="(die, index) in dice_stores" :key="index">
    <drop class="drop list" @drop="handleDrop(list, ...arguments)">
      <drag v-for="item in list"
        class="drag"
        :key="item"
        :class="{ [item]: true }"
        :transfer-data="{ item: item, list: list, example: 'lists' }">
          {{ item }}
      </drag>
    </drop>
  </div>



</template>

<script>
export default {
  name: 'game'
}
</script>

<style lang="css" scoped>
</style>
