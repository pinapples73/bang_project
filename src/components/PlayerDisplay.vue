<template>

  <div>

    <div id="player-div">
      <div>
        <drop class="drop" :players="players" @drop="handleDrop0">
          {{ players[4] }}
        </drop>
      </div>


    </div>

    <div id="dice-div">
      <div v-if="!diceRoleComplete" :key="diceRoleComplete">
        <dice-roller></dice-roller>
      </div>

      <div v-if="diceRoleComplete" :key="diceRoleComplete">
        <drag v-for="(die, index) in choosenDice" class="drag" :key="index" :class="{ [die]: true }"
        :transfer-data="{ die, index } "
        @dragstart="dragging = die"
        @dragend="dragging = null">
        {{ die }}
      </drag>
    </div>
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
      'activePlayer': 0,
      'choosenDice': null,
      'diceRoleComplete': false
    }
  },
  methods: {
    handleDragover(group, data, event) {
      if (group !== data.group) {
        event.dataTransfer.dropEffect = 'none';
      }
    },
    handleDrop0(data) {
      alert(`You dropped a ${data.die} die at dice index ${data.index}`);
      if(data.die === 'health') {
        if(this.players[0].currentHealth === this.players[0].maxHealth) {
          alert(`The player is at full health`);
        }
        else {
          this.players[0].currentHealth += 1;
          this.choosenDice.splice( data.index, 1 );
          alert(`Thanks for the health man!`);
        }
      };
      if(data.die === 'shoot1') {
        if(this.players[0].currentHealth === 0) {
          alert(`The player is already deid`);
        }
        else {
          this.players[0].currentHealth -= 1;
          this.choosenDice.splice( data.index, 1 );
          alert(`Argh! You got me!`);
        }
      };
    }
  }
}
</script>

<style lang="css" scoped>
#player-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#dice-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  height: 500px;
}
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
.drop.allowed {
		background-color: #dfd;
}
</style>
