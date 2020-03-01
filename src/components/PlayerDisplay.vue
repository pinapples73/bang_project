<template>

  <div>
    HI
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
export default {
  name: 'player-display',
  props: ['players']


}
</script>

<style lang="css" scoped>
</style>
