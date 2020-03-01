<template>
  <div>
    <div :key="currentPlayer" v-if="(currentPlayer) < 5">
      <h2>Setup {{players[currentPlayer].name}}</h2>

      <div>
        <label for="name">Enter Name:</label>
        <input type="text" id="playerName" name="playerName" v-model="players[currentPlayer].name" required/>
      </div>

      <div v-if="nameEntered" :key="nameEntered">
        <p>Character: {{players[currentPlayer].character}}</p>
        <p>Max Health: {{players[currentPlayer].maxHealth}}</p>
        <p>Special Ability: {{players[currentPlayer].special}}</p>
        <p>Role: {{players[currentPlayer].role}}</p>
      </div>

      <div v-if="!nameEntered" :key="nameEntered">
        <button type="button" name="button" v-on:click="handleSubmit">Create Character</button>
      </div>
      <div v-if="nameEntered" :key="nameEntered">
        <button type="button" name="button" v-on:click="handleNextPlayer">Next Player</button>
      </div>

    </div>

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
    handleSubmit(){
      this.assignCharacter();
      this.assignRole();
    },
    assignCharacter(){
      this.nameEntered = true;
      let randomNumber = Math.floor(Math.random() * this.players.length);
      const selectedCharacter = this.characters[randomNumber];
      this.players[this.currentPlayer].character = selectedCharacter.name;
      this.players[this.currentPlayer].maxHealth = selectedCharacter.maxHealth;
      this.players[this.currentPlayer].special = selectedCharacter.special;
      //remove selected character from characters array
      this.characters.forEach((character, index) => {
        if (character.name === selectedCharacter.name) {
          this.characters.splice(index, 1);
        }
      })
    },
    assignRole(){
      let randomNumber = Math.floor(Math.random() * this.roles.length);
      const selectedRole = this.roles[randomNumber];
      let selectedIndex = null;
      this.players[this.currentPlayer].role = selectedRole;

      this.roles.forEach((role, index) => {
        if (role === selectedRole) {
          // selectedIndex = index;
          this.roles.splice( this.roles.indexOf(role), 1 );
        };
      });
      console.log(selectedRole, selectedIndex, this.roles);

    },
    handleNextPlayer(){
      this.currentPlayer += 1;
      this.nameEntered = false;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
