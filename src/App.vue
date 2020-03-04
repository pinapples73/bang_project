<template lang="html">

  <div id='game_window'>
    <div v-if="gameState === 'player-setup'">
      <player-setup :players="players" :characters="characters" :roles="roles" ></player-setup>
    </div>

    <div v-if="gameState === 'dice-roller'">
      <dice-roller></dice-roller>
    </div>

    <div v-if="gameState === 'initialiseGame'">
      <player-display :players="players"></player-display>
    </div>
  </div>


</template>

<script>
import PlayerSetup from "./components/PlayerSetup.vue";
import DiceRoller from "./components/DiceRoller.vue";
import PlayerDisplay from './components/PlayerDisplay.vue';
import {eventBus} from './main.js';
export default {
  name: 'app',
  components:{
    'dice-roller': DiceRoller,
    'player-setup': PlayerSetup,
    'player-display': PlayerDisplay
  },
  mounted(){
    eventBus.$on("initialiseGame",(startingPlayer) => {
      this.gameState = 'initialiseGame';
    })
  },
  data (){
    return {
      gameState: 'player-setup',
      players: [
        {
          name: 'player1',
          arrowCount: 0,
          maxHealth: 5,
          currentHealth: 1,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player2',
          arrowCount: 0,
          maxHealth: 4,
          currentHealth: 1,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player3',
          arrowCount: 0,
          maxHealth: 7,
          currentHealth: 5,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player4',
          arrowCount: 0,
          maxHealth: 2,
          currentHealth: 1,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        },
        {
          name: 'player5',
          arrowCount: 0,
          maxHealth: 6,
          currentHealth: 2,
          character: 'unknown',
          role: 'unknown',
          special: 'unknown'
        }
      ],
      characters: [
        {
          name: 'BART CASSIDY',
          className: 'bart-cassidy',
          picture: "./src/assets/images/bartcassidy.png",
          maxHealth: 7,
          special: 'double-damage'
        },
        {
          name: 'PAUL REGRET',
          className: 'paul-regret',
          picture: "./src/assets/images/paulregret.png",
          maxHealth: 9,
          special: 'no-gatlin-damage'
        },
        {
          name: 'BLACK JACK',
          className: 'black-jack',
          maxHealth: 7,
          special: 'health-per-round'
        },
        {
          name: 'SLAB THE KILLER',
          className: 'slab-the-killer',
          picture: "./src/assets/images/slabkiller.png",
          maxHealth: 8,
          special: 'grim-reaper'
        },
        {
          name: 'EL GRINGO',
          className: 'el-gringo',
          picture: "./src/assets/images/elgringo.png",
          maxHealth: 8,
          special: 'double-health'
        },
        {
          name: 'CALAMITY JANET',
          className: 'calamity-janet',
          picture: "./src/assets/images/calamityjanet.png",
          maxHealth: 8,
          special: 'gatlin-double-damage'
        },
        {
          name: 'ROSE DOOLAN ',
          className: 'rose-doolan',
          picture: "./src/assets/images/rosedoolan.png",
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


#game_window {
  /* background-color: grey; */
  height: 100%;
  padding: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('./assets/images/background.jpg');
  /* background-image: url("https://image.shutterstock.com/image-illustration/grunge-background-wild-west-landscape-260nw-16340476.jpg"); */
}



</style>
