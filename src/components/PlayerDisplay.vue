<template>

  <div id="whole-game">

    <div v-if="diceRoleComplete" :key="diceRoleComplete" id="player-div">
      <div>
        <drop class="drop" :players="players" @drop="handleDrop0">
          {{ players[0] }}
        </drop>
      </div>
      <div>
        <drop class="drop" :players="players" @drop="handleDrop1">
          {{ players[1] }}
        </drop>
      </div>
      <div>
        <drop class="drop" :players="players" @drop="handleDrop2">
          {{ players[2] }}
        </drop>
      </div>
      <div>
        <drop class="drop" :players="players" @drop="handleDrop3">
          {{ players[3] }}
        </drop>
      </div>
      <div>
        <drop class="drop" :players="players" @drop="handleDrop4">
          {{ players[4] }}
        </drop>
      </div>
    </div>

    <div v-if="!diceRoleComplete" :key="diceRoleComplete" id="player-div2">
      <div class="drop">
          {{ players[0] }}
      </div>
      <div class="drop">
          {{ players[1] }}
      </div>
      <div class="drop">
          {{ players[2] }}
      </div>
      <div class="drop">
          {{ players[3] }}
      </div>
      <div class="drop">
          {{ players[4] }}
      </div>
    </div>

    <div id="dice-div">
      <div v-if="!diceRoleComplete" :key="diceRoleComplete">
        <dice-roller :activePlayer="activePlayer"></dice-roller>
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
      this.checkForThreeGatlins();
    });
    eventBus.$on("tooManyDynamite", () => {
      if(this.players[this.activePlayer].currentHealth > 0) {
        this.players[this.activePlayer].currentHealth -= 1;
      };
      this.choosenDice = [];
      this.moveToNextPlayer();
    });
    eventBus.$on("arrowRolled", () => {
      this.players[this.activePlayer].arrowCount += 1;
      if(this.mainArrowSupply > 0) {
        this.mainArrowSupply -= 1;
      };
      this.checkMainArrowSupply();
    });
  },
  data () {
    return {
      choosenDice: null,
      diceRoleComplete: false,
      activePlayer:0,
      mainArrowSupply: 5
    }
  },
  methods: {
    checkForThreeGatlins(){
      let gatlinCount = 0;
      for(const die of this.choosenDice) {
        if(die === 'gatlin') {
          gatlinCount += 1;
        };
      };
      if (gatlinCount >= 3) {
        alert(`You have at least 3 Gatlins. All players take 1 damage!`);
        this.gatlinDamage();
        // TODO: move to next player if no good dice Left
        this.dropableDiceLeft();
      };
    },
    gatlinDamage(){
      for(const player of this.players) {
        if(player !== this.players[this.activePlayer]) {
          if(player.currentHealth > 0) {
            player.currentHealth -= 1;
          };
        };
      };
    },
    checkMainArrowSupply(){
      if(this.players[this.activePlayer].currentHealth >0){
        alert(`You got shot with an arrow`);
      };
      if(this.mainArrowSupply === 0) {
        alert(`The main arrow supply is empty. Prepare to take arrow damage!`);
        for(const player of this.players) {
          if(player.currentHealth > 0) {
            player.currentHealth -= player.arrowCount;
          };
          if(player.currentHealth <= 0) {
            player.currentHealth = 0;
          };
          if(this.players[this.activePlayer].currentHealth === 0) {
            alert(`You succummbed to arrows. You are dead! Next!!!! `)
            eventBus.$emit(`activePlayerDiedByArrows`);
            this.moveToNextPlayer();
          }
          player.arrowCount = 0;
        };
        this.mainArrowSupply = 5;
      }
    },
    handleDragover(group, data, event) {
      if (group !== data.group) {
        event.dataTransfer.dropEffect = 'none';
      }
    },
    moveToNextPlayer(){
      if(this.activePlayer === 4) {
        this.activePlayer = 0;
      }
      else {
        this.activePlayer += 1;
      };
      if(this.players[this.activePlayer].currentHealth === 0) {
        this.moveToNextPlayer();
      }
      this.choosenDice = null;
      this.diceRoleComplete = false;
    },
    dropableDiceCheck() {
      let dropableDiceLeft = false;
      let allAtFullHealth = true;
      for(const dice of this.choosenDice){
        if(dice === 'health' || dice === 'shoot1') {
          for(const player of this.players) {
            if(player.currentHealth !== player.maxHealth ) {
              allAtFullHealth = false;
            };
          };
          dropableDiceLeft = true;
        };
      };
      // if(allAtFullHealth === true && this.dice === 'health') {
      //   dropableDiceLeft === false;
      // };
      if(dropableDiceLeft === false) {
        alert(`No more dice can be used. Your turn is over.`);
        this.moveToNextPlayer();
      };
    },
    handleDrop0(data) {
      if(data.die === 'health') {
        if(this.players[0].currentHealth === this.players[0].maxHealth) {
          alert(`The player is at full health`);
        }
        else if (this.players[0].currentHealth === 0) {
            alert('This player is deid ya numpty!');
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
          if(this.players[0].currentHealth <= 0) {
            this.players[0].currentHealth = 0;
            alert(`Ya killed me ya no good dirty rat!`)
          } else {
            alert(`Argh! You got me!`);
          }
        }
      };

      this.dropableDiceCheck();
    },
    handleDrop1(data) {
      if(data.die === 'health') {
        if(this.players[1].currentHealth === this.players[1].maxHealth) {
          alert(`The player is at full health`);
        }
        else if (this.players[1].currentHealth === 0) {
            alert('This player is deid ya numpty!');
        }
        else {
          this.players[1].currentHealth += 1;
          this.choosenDice.splice( data.index, 1 );
          alert(`Thanks for the health man!`);
        }
      };

      if(data.die === 'shoot1') {
        if(this.players[1].currentHealth === 0) {
          alert(`The player is already deid`);
        }
        else {
          this.players[1].currentHealth -= 1;
          this.choosenDice.splice( data.index, 1 );
          if(this.players[1].currentHealth <= 0) {
            this.players[1].currentHealth = 0;
            alert(`Ya killed me ya no good dirty rat!`)
          } else {
            alert(`Argh! You got me!`);
          }
        }
      };

      this.dropableDiceCheck();
    },
    handleDrop2(data) {
      if(data.die === 'health') {
        if(this.players[2].currentHealth === this.players[2].maxHealth) {
          alert(`The player is at full health`);
        }
        else if (this.players[2].currentHealth === 0) {
            alert('This player is deid ya numpty!');
        }
        else {
          this.players[2].currentHealth += 1;
          this.choosenDice.splice( data.index, 1 );
          alert(`Thanks for the health man!`);
        }
      };

      if(data.die === 'shoot1') {
        if(this.players[2].currentHealth === 0) {
          alert(`The player is already deid`);
        }
        else {
          this.players[2].currentHealth -= 1;
          this.choosenDice.splice( data.index, 1 );
          if(this.players[2].currentHealth <= 0) {
            this.players[2].currentHealth = 0;
            alert(`Ya killed me ya no good dirty rat!`)
          } else {
            alert(`Argh! You got me!`);
          }
        }
      };

      this.dropableDiceCheck();
    },
    handleDrop3(data) {
      if(data.die === 'health') {
        if(this.players[3].currentHealth === this.players[3].maxHealth) {
          alert(`The player is at full health`);
        }
        else if (this.players[3].currentHealth === 0) {
          alert('This player is deid ya numpty!');
        }
        else {
          this.players[3].currentHealth += 1;
          this.choosenDice.splice( data.index, 1 );
          alert(`Thanks for the health man!`);
        }
      };

      if(data.die === 'shoot1') {
        if(this.players[3].currentHealth === 0) {
          alert(`The player is already deid`);
        }
        else {
          this.players[3].currentHealth -= 1;
          this.choosenDice.splice( data.index, 1 );
          if(this.players[3].currentHealth <= 0) {
            this.players[3].currentHealth = 0;
            alert(`Ya killed me ya no good dirty rat!`)
          } else {
            alert(`Argh! You got me!`);
          }
        };

        this.dropableDiceCheck();
      }
    },
    handleDrop4(data) {
      if(data.die === 'health') {
        if(this.players[4].currentHealth === this.players[4].maxHealth) {
          alert(`The player is at full health`);
        }
        else if (this.players[4].currentHealth === 0) {
            alert('This player is deid ya numpty!');
        }
        else {
          this.players[4].currentHealth += 1;
          this.choosenDice.splice( data.index, 1 );
          alert(`Thanks for the health man!`);
        }
      };

      if(data.die === 'shoot1') {
        if(this.players[4].currentHealth === 0) {
          alert(`The player is already deid`);
        }
        else {
          this.players[4].currentHealth -= 1;
          this.choosenDice.splice( data.index, 1 );
          if(this.players[4].currentHealth <= 0) {
            this.players[4].currentHealth = 0;
            alert(`Ya killed me ya no good dirty rat!`)
          } else {
            alert(`Argh! You got me!`);
          };
        };
      };
      this.dropableDiceCheck();
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
#player-div2 {
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
.drag.shoot1 {
  background-image: url("../assets/images/shoot1.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 10px;
  border-radius: 15px;
}
.drag.shoot2 {
  background-image: url("../assets/images/shoot2.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 10px;
  border-radius: 15px;
}
.drag.arrow {
  background-image: url("../assets/images/arrow.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 10px;
  border-radius: 15px;
}
.drag.health {
  background-image: url("../assets/images/health.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 10px;
  border-radius: 15px;
}
.drag.gatlin {
  background-image: url("../assets/images/gatlin.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 10px;
  border-radius: 15px;
}
.drag.dynamite {
  background-image: url("../assets/images/dynomite.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-right: 10px;
  border-radius: 15px;
}
.drop {
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  margin: 20px;
  width: 125px;
  background-color: grey;
  height: 200px;
  text-align: center;
  border: 5px solid black;
  border-radius: 15px;
  font-weight: bold;
  background: rgba(9, 10, 9, 0.5);
  box-shadow: 0 0 25px 1px black;

}
.drop.allowed {
		background-color: #dfd;
}
#whole-game{
background-image: url("https://image.shutterstock.com/image-illustration/grunge-background-wild-west-landscape-260nw-16340476.jpg");
height: 100%;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
}
</style>
