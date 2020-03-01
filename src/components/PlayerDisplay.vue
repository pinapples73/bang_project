<template>

  <div>

		<div>
			<drop v-for="(player, index) in players" class="drop" :key="index" :class="{ allowed: dragging === player }"
      @dragover="handleDragover(player, ...arguments)"
      @drop="handleDrop">
					{{ player }}
			</drop>
		</div>

    <div v-if="!diceRoleComplete" :key="diceRoleComplete">
      <dice-roller></dice-roller>
    </div>

    <div v-if="diceRoleComplete" :key="diceRoleComplete">
      <drag v-for="die in choosenDice" class="drag" :key="players" :class="{ [die]: true }" :transfer-data="{ die, example: 'die' } "
      @dragstart="dragging = die"
      @dragend="dragging = null">

      {{ die }}
    </drag>
    Distribute dice!
  </div>
</div>

</template>

<script>
import {eventBus} from '../main.js';
import { Drag, Drop } from 'vue-drag-drop';
import DiceRoller from './DiceRoller.vue';
export default {
  name: 'player-display',
  props: ['players'],
  components: { Drag, Drop, 'dice-roller': DiceRoller },
  mounted(){
    eventBus.$on("finshedRolling",(payload) => {
      this.choosenDice = payload;
      this.diceRoleComplete = true;
      console.log("AAAAAAAAA")
    })
  },
  data () {
    return {
      'choosenDice': null,
      'diceRoleComplete': false
    }
  },
  methods: {
    handleDrop(){
      
    }
  }
}
</script>

<style lang="css" scoped>
.drag {
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  /* margin-bottom: 20px; */
  width: 80px;
  height: 80px;
  text-align: center;
}
.drag.shoot1 { background: #aaa;}
.drag.shoot2 { background: #888; }
.drag.arrow { background: #666; }
.drag.health { background: #444; color: #aaa}
.drag.gatlin { background: #222; color: #aaa}
.drag.dynamite { background: red; color: white}
.drop {
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  margin: 20px;
  width: 125px;
  background-color: grey;
  height: 200px;
  text-align: center;
}
</style>
