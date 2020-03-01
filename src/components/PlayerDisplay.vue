<template>

  <div>

		<!-- <div>
			<drop v-for="player in players" class="drop" :key="player"
      @dragover="handleDragover(player, ...arguments)"
      @drop="handleDrop">
					{{ player }}
			</drop>
		</div> -->

    <div>
      <drop class="drop" :players="players" @drop="handleDrop" @dragover="handleDragover(player, ...arguments)">
        {{ players[0] }}
      </drop>
    </div>

    <div>
      <drop class="drop" :players="players" @drop="handleDrop" @dragover="handleDragover(player, ...arguments)">
        {{ players[1] }}
      </drop>
    </div>

    <div>
      <drop class="drop" :players="players" @drop="handleDrop" @dragover="handleDragover(player, ...arguments)">
        {{ players[2] }}
      </drop>
    </div>

    <div>
      <drop class="drop" :players="players" @drop="handleDrop" @dragover="handleDragover(player, ...arguments)">
        {{ players[3] }}
      </drop>
    </div>

    <div>
      <drop class="drop" :players="players" @drop="handleDrop" @dragover="handleDragover(player, ...arguments)">
        {{ players[4] }}
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
    handleDragover(group, data, event) {
      if (group !== data.group) {
        event.dataTransfer.dropEffect = 'none';
      }
    },
    handleDrop(data) {
      alert(`You dropped with data: ${JSON.stringify(data)}`);
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
.drop.allowed {
		background-color: #dfd;
}
</style>
