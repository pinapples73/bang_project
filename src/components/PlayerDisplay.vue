<template>

  <div>
		<div>
			<!-- <drag v-for="player in players" class="drag" :key="group" :transfer-data="{ group, example: 'groups' }"
				@dragstart="dragging = group"
				@dragend="dragging = null">
					{{ group }}
			</drag> -->
		</div>
		<div>
			<drop v-for="player in players" class="drop" :key="players" :class="{ allowed: dragging === group }"
				@dragover="handleDragover(group, ...arguments)"
				@drop="handleDrop">
					{{ player }}
			</drop>
		</div>
	</div>

</template>

<script>
import { Drag, Drop } from 'vue-drag-drop';

export default {
  name: 'player-display',
  props: ['players'],
  components: { Drag, Drop }
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
</style>
