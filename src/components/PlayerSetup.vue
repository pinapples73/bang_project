<template>
  <div id="start-game">
  <div>
    <!-- This checks if current player is smaller than 5
    if it is then the div will be displayed
    if current player is 5 or more it will not show up
    as setup of players would be complete-->
    <div id="player-setup" :key="currentPlayer" v-if="(currentPlayer) < 5">
      <h2>Create Your Character</h2>

      <div id="enter-name">
        <label for="name">Enter Name</label>
        <input type="text" id="playerName" name="playerName" v-model="players[currentPlayer].name" required/>
      </div>

      <!-- This is the Create Character button. similar to above the div will
      display depending on the value of nameEntered. In this instance if its
      false it will display-->
      <div v-if="!nameEntered" :key="nameEntered">
        <button id="name-enter" type="button" name="button" v-on:click="handleSubmit">Create Character</button>
      </div>
      <!-- This is the Next Player button. similar to above the div will
      display depending on the value of nameEntered. In this instance if its
      true it will display-->
      <div  v-if="nameEntered" :key="nameEntered">
        <button id="next-player" type="button" name="button" v-on:click="handleNextPlayer">Next Player</button>
      </div>

      <!-- This stays hidden until you click Create Character button -->
      <!-- if chcks if variable NameEntered is true and if it is it displays
      the div-->
      <div id="assigned-char" v-if="nameEntered" :key="nameEntered">
        <h3>{{players[currentPlayer].character}}</h3>
        <div :class="`char-image ${players[currentPlayer].className}`"> </div>
        <br>Max Health: {{players[currentPlayer].maxHealth}}</br>
        <!-- <p>Special Ability: {{players[currentPlayer].special}}</p> -->
        <p>Role: {{players[currentPlayer].role}}</p>
        <!-- <img :src="players[currentPlayer].picture" /> -->
        <!-- <div :class="`char-image ${players[currentPlayer].className}`"> </div> -->
      </div>
    </div>
    <!-- This div states that setup is complete and will display when currentPlayer is
    equal to 5-->
    <div :key="currentPlayer" v-if="(currentPlayer) === 5">
      Player Setup complete
      <div v-for="(player, index) in players">
        <p>{{player.name}}</p>
        <p>{{player.character}}</p>
        <p>{{player.role}}</p>
        <hr>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import {eventBus} from '../main.js';
export default {
  name: 'player-setup',
  props:['players','characters','roles'],
  data () {
    return {
      currentPlayer: 0,
      nextPlayer: 0,
      playerName: "",
      nameEntered: false
    }
  },
  methods: {
    // this method is called when you click the create character button
    // it then calls two other functions
    // 1. to assign the character
    // 2. to assign the role
    handleSubmit(){
      this.assignCharacter();
      this.assignRole();
    },
    // this method assigns a character to the current player
    assignCharacter(){
      // this variable nameEntered is used to display and hid divs in the HTML at top
      this.nameEntered = true;
      // Jacks randomiser shows itself again here this time checking for a
      // random number between 0 and the number of charcters we have in the
      // array
      let randomNumber = Math.floor(Math.random() * this.characters.length);
      console.log(`random number:`, randomNumber);
      // the next line picks a character based on the randomNumber to use
      // as an index in the characters array
      const selectedCharacter = this.characters[randomNumber];
      // the next three lines take details from the selected characters object
      // and assign them to the current player eg. max health, special etc
      this.players[this.currentPlayer].character = selectedCharacter.name;
      this.players[this.currentPlayer].maxHealth = selectedCharacter.maxHealth;
      this.players[this.currentPlayer].currentHealth = selectedCharacter.maxHealth;
      this.players[this.currentPlayer].special = selectedCharacter.special;
      this.players[this.currentPlayer].className = selectedCharacter.className;
      //remove selected character from characters array
      //  this ensures the same character will not be choosen a second time
      // loops over the characters array and if the character equals them
      // selected character it splices it from the array usings its index
      this.characters.forEach((character, index) => {
        if (character.name === selectedCharacter.name) {
          this.characters.splice(index, 1);
        }
      })
    },
    //This method assigns a role to teh current player
    assignRole(){
      // The Portwood randomiser used again this time it generates
      // a random number between 0 and the amount of roles we have
      // in the roles array
      let randomNumber = Math.floor(Math.random() * this.roles.length);
      console.log(`random number:`, randomNumber);
      // as in assigning characters this uses the random number to pick
      // a role from the roles array using an index
      const selectedRole = this.roles[randomNumber];
      //The next line assignes the selected role to the current player
      this.players[this.currentPlayer].role = selectedRole;
      // the below for loop checks where in the loop the selected role
      // is located and then removes it from array so it cant be picked again
      this.roles.forEach((role, index) => {
        if (role === selectedRole) {
          this.roles.splice( this.roles.indexOf(role), 1 );
        };
      });
    },
    //This method is called when the next player button is clicked
    //it changes the current player variable bu one so it moves to next player
    // then it sets name NameEntered to false so the correct html divs etc are displayed
    handleNextPlayer(){
      let startingPlayer = 0;
      //below if block checks if sheriff was assigned and increases health
      if(this.players[this.currentPlayer].role === 'sheriff') {
        this.players[this.currentPlayer].maxHealth += 2;
        this.players[this.currentPlayer].currentHealth -= 5;
        startingPlayer = this.currentPlayer;
      };


      //increment current player to move to next player
      this.currentPlayer += 1;
      //reset name entered to reset html for next player
      this.nameEntered = false;

      if(this.currentPlayer === 5){
         eventBus.$emit("initialiseGame", startingPlayer)
      }

    }
  }
}
</script>

<style lang="css" scoped>


#start-game{
  height: 1100px;
  padding: 20px;
}
#enter-name{
  font-family: 'colt';
  font-size: 25px;
  font-weight: bold;
  margin: auto;
  box-sizing: border-box;
  align-items: center;
  width: 300px;
  /* border: 5px solid #8A573E; */
  margin: 15 auto;
  border-radius: 15px;
  padding: 10px 10px 5px 5px;
  background: rgba(195, 147, 80, 0.5);
  box-shadow: 0 0 25px 1px black;
  margin-bottom: 20px;
  /* padding: 50px 20px 50px 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#assigned-char{
  font-size: 21px;
  font-weight: bold;
  margin: auto;
  box-sizing: border-box;
  align-items: center;
  width: 300px;
  height: 400px;
  border: 5px;
  /* border-color: #A17538; */
  margin: 15 auto;
  border-radius: 15px;
  padding: 5px;
  background: rgba(195, 147, 80, 0.5);
  box-shadow: 0 0 25px 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#player-setup{
  text-align: center;
  font-size: 30px;
}

#name-enter{
  width: 120px;
  height: 80px;
  margin-top: 15px;
  border-radius: 11px;
  box-shadow: 0 0 25px 1px black;
  font-size: 20px;
  background-color: rgba(100, 100, 100, 0.5);
  border: 5px solid grey;
}

#name-enter:hover{
  width: 120px;
  height: 80px;
  margin-top: 15px;
  border-radius: 11px;
  box-shadow: 0 0 25px 1px black;
  font-size: 20px;
  background-color: rgba(156, 155, 153, 0.5);
  border: 5px solid grey;
}

#next-player:hover{
  width: 120px;
  height: 80px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 11px;
  box-shadow: 0 0 25px 1px black;
  font-size: 20px;
  background-color: rgba(156, 155, 153, 0.5);
  border: 5px solid grey;
}

#next-player{
  width: 120px;
  height: 80px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 11px;
  box-shadow: 0 0 25px 1px black;
  font-size: 20px;
  background-color: rgba(100, 100, 100, 0.5);
  border: 5px solid grey;
}

#playerName{
  width: 75%;
  padding: 5px 10px;
  margin: 8px 0;
  box-sizing: border-box;
  text-align: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  color: black;
  border: 5px solid #A17538;
  border-radius: 4px;
}

.char-image {
  width: 240px;
  height: 240px;
  background-repeat: no-repeat;
  background-size: cover;
}

.bart-cassidy {
  background-image: url("../assets/images/bartcassidy.png");
  border: 5px solid black;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paul-regret {
  background-image: url("../assets/images/paulregret.png");
  border: 5px solid black;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}


.slab-the-killer {
  background-image: url("../assets/images/Slabkiller.png");
  border: 5px solid black;
  border: 5px solid black;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-gringo {
  background-image: url("../assets/images/elgringo.png");
  border: 5px solid black;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calamity-janet {
  background-image: url("../assets/images/calamityjanet.png");
  border: 5px solid black;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rose-doolan {
  background-image: url("../assets/images/rosedoolan.png");
  border: 5px solid black;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}

.black-jack {
  background-image: url("../assets/images/blackjack.png");
  /* border: 5px solid black; */
  border: 5px solid black;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
