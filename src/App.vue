<template lang="html">
  <div id='game_window'>
    <div v-if="gameState === 'player-setup'">
      <player-setup :players="players" :characters="characters" :roles="roles" ></player-setup>
    </div>

    <div v-if="gameState === 'dice-roller'">
      <h3>Roll Yer Dice Dude!</h3>
      <dice-roller></dice-roller>
    </div>

    <div v-if="gameState === 'initialiseGame'">
      <h3>Initialse Game</h3>
      <player-display :players="players"></player-display>
    </div>
	</div>

</template>

<script>
import PlayerSetup from "./components/PlayerSetup.vue";
import DiceRoller from "./components/DiceRoller.vue";
import DragImage from './components/DragImage.vue';
import DragHtml from './components/DragHtml.vue';
import DropEffects from './components/DropEffects.vue';
import PlayerDisplay from '.components/PlayerDisplay.vue';
import {eventBus} from './main.js';
export default {
  name: 'app',
  components:{
    'dice-roller': DiceRoller,
    'player-setup': PlayerSetup,
    'player-display': PlayerDisplay
  },
  mounted(){
    eventBus.$on("initialiseGame",() => {
      this.gameState = 'initialiseGame';
      console.log("XXXXXX")
    })
  },
  data (){
    return {
      gameState: 'player-setup',
      mainArrowSupply: 15,
      players: [
        {
          name: 'player1',
          arrowCount: 0,
          maxHealth: 0,
          currentHealth: 0,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player2',
          arrowCount: 0,
          maxHealth: 0,
          currentHealth: 0,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player3',
          arrowCount: 0,
          maxHealth: 0,
          currentHealth: 0,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player4',
          arrowCount: 0,
          maxHealth: 0,
          currentHealth: 0,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player5',
          arrowCount: 0,
          maxHealth: 0,
          currentHealth: 0,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        }
      ],
      characters: [
        {
          name: 'BART CASSIDY',
          maxHealth: 7,
          special: 'double-damage'
        },
        {
          name: 'PAUL REGRET',
          maxHealth: 9,
          special: 'no-gatlin-damage'
        },
        {
          name: 'BLACK JACK',
          maxHealth: 7,
          special: 'health-per-round'
        },
        {
          name: 'SLAB THE KILLER',
          maxHealth: 8,
          special: 'grim-reaper'
        },
        {
          name: 'EL GRINGO',
          maxHealth: 8,
          special: 'double-health'
        },
        {
          name: 'CALAMITY JANET',
          maxHealth: 8,
          special: 'gatlin-double-damage'
        },
        {
          name: 'ROSE DOOLAN ',
          maxHealth: 9,
          special: 'extra-re-roll'
        }
      ],
      roles: ['outlaw', 'outlaw', 'sheriff', 'deputy', 'renegade']
    }
  },
}
</script>

<style lang="css" scoped>
</style>
