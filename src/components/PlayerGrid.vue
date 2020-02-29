<template lang="html">
  <div id="PlayerGrid">
    <h2>Players</h2>
    <player v-for="(player, index) in players" :key="index" :player="player"> </player>
  </div>
</template>

<script>
import {eventBus} from '../main';
import Player from './Player';



export default {
  name: "Player",
  data(){
    return {
      players: []
    }
  },
  components: {
    'player': Player
  },
  mounted(){
    eventBus.$on('player-added', (player) => {
      this.players.push(player)
    })
  }
}
</script>

<style lang="css" scoped>
</style>
