<template lang="html">
<div id="whole-game">
  <div id="player-form">
    <player-form></player-form>
  </div>
<ul>
  <div id="player-grid">
    <player-grid></player-grid>
  </div>
</ul>

  <div id='game_window'>
			<h3>Load Game</h3>
			<dice-lists></dice-lists>
	</div>
</div>
</div>
</template>

<script>
import PlayerForm from './components/PlayerForm.vue';
import PlayerGrid from './components/PlayerGrid.vue';
import DiceLists from "./components/DiceLists.vue";
import DragImage from './components/DragImage.vue';
import DragHtml from './components/DragHtml.vue';
import DropEffects from './components/DropEffects.vue'
export default {
  name: 'app',
  components:{
    'player-form': PlayerForm,
    'player-grid': PlayerGrid,
    'dice-lists': DiceLists
  }
}
</script>

<style>

</style>
