<template lang="html">
  <form id='player-form' v-on:submit='handleSubmit'>
    <h2> Add a Player </h2>
    <div class="formwrap">
      <label for="playerName">Player Name </label>
      <input type="text" id="playerName" v-model="player.playerName" required/>
    </div>
    <input type="submit" value="save" id="save"/>
  </form>

</template>

<script>

import { eventBus } from '../main.js';
import Player from './Player';


export default {
  name: 'player-form',
  data(){
    return {
      player: {
        playerName: "",
        arrows: []
      }
    }
  },
  methods: {
    handleSubmit(event){
      event.preventDefault();
      eventBus.$emit('player-added', this.player);
      }
    }
  }


</script>

  <style lang="css" scoped>
  </style>
