<template lang="html">
  <div id='game_window'>
			<h3>Load Game</h3>
			<game></game>
	</div>

</template>

<script>
import Game from "./components/Game";
import DragImage from './components/DragImage.vue';
import DragHtml from './components/DragHtml.vue';
import DropEffects from './components/DropEffects.vue'
export default {
  name: 'app',
  components:{
    'game': Game
  }
}
</script>

<style lang="css" scoped>
</style>
