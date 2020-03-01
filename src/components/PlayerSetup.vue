<template>
  <div>
    <!-- This checks if current player is smaller than 5
    if it is then the div will be displayed
    if current player is 5 or more it will not show up
    as setup of players would be complete-->
    <div :key="currentPlayer" v-if="(currentPlayer) < 5">
      <h2>Setup {{players[currentPlayer].name}}</h2>

      <div>
        <label for="name">Enter Name:</label>
        <input type="text" id="playerName" name="playerName" v-model="players[currentPlayer].name" required/>
      </div>

      <!-- This stays hidden until you click Create Character button -->
      <!-- if chcks if variable NameEntered is true and if it is it displays
      the div-->
      <div v-if="nameEntered" :key="nameEntered">
        <p>Character: {{players[currentPlayer].character}}</p>
        <p>Max Health: {{players[currentPlayer].maxHealth}}</p>
        <p>Special Ability: {{players[currentPlayer].special}}</p>
        <p>Role: {{players[currentPlayer].role}}</p>
      </div>

      <!-- This is the Create Character button. similar to above the div will
      display depending on the value of nameEntered. In this instance if its
      false it will display-->
      <div v-if="!nameEntered" :key="nameEntered">
        <button type="button" name="button" v-on:click="handleSubmit">Create Character</button>
      </div>
      <!-- This is the Next Player button. similar to above the div will
      display depending on the value of nameEntered. In this instance if its
      true it will display-->
      <div v-if="nameEntered" :key="nameEntered">
        <button type="button" name="button" v-on:click="handleNextPlayer">Next Player</button>
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


</template>

<script>
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
      //below if block checks if sheriff was assigned and increases health
      if(this.players[this.currentPlayer].role === 'sheriff') {
        this.players[this.currentPlayer].maxHealth += 2;
        this.players[this.currentPlayer].currentHealth += 2;
      };
      //increment current player to move to next player
      this.currentPlayer += 1;
      //reset name entered to reset html for next player
      this.nameEntered = false;

    }
  }
}
</script>

<style lang="css" scoped>
</style>
