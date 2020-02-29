<template lang="html">
  <div class="player">
    <h2>{{ player.playerName}}</h2>

  </div>
</template>

<script>
import {eventBus} from '@/main.js'


export default {
  name: "player",
  props: ['player'],

  }

</script>

<style lang="css" scoped>
</style>
