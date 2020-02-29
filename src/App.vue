<template lang="html">
  <div id='game_window'>
			<h3>Load Game</h3>
			<dice-lists></dice-lists>
	</div>

</template>

<script>
import DiceLists from "./components/DiceLists.vue";
import DragImage from './components/DragImage.vue';
import DragHtml from './components/DragHtml.vue';
import DropEffects from './components/DropEffects.vue'
export default {
  name: 'app',
  components:{
    'dice-lists': DiceLists
  }
}
</script>

<style lang="css" scoped>
</style>
