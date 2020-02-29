<template>
	<div>
		<div v-for="(list, index) in dice_bags" :key="index">
			<drop class="drop list" @drop="handleDrop(list, ...arguments)">
				<drag v-for="item in list" class="drag" :key="item" :class="{ [item]: true }" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
					{{ item }}	
				</drag>	
			</drop>
		</div>
		<button type=button class="roll" v-on:click ="rollAll">Roll</button>
	</div>
</template>

<script>
import {eventBus} from '../main.js';
	import { Drag, Drop } from 'vue-drag-drop';


	export default {
		components: { Drag, Drop },
		data() {
			return {
				dice_bags: [
					['shoot1', 'shoot2', 'gatlin', 'arrow', 'health'],
					[]
				],
				diceFaces: ['shoot1','shoot2','health','arrow','gatlin','dynamite']
			};
		},
		mounted (){
			
		},
		computed: {

		},
		methods: {
			handleDrop(toList, data) {
				const fromList = data.list;
				if (fromList) {
					toList.push(data.item);
					fromList.splice(fromList.indexOf(data.item), 1);
					toList.sort((a, b) => a > b);
          			console.log(this.dice_bags[0].length);
				}
			},
			getRandomDie() {
				this.randomNumber = Math.floor(Math.random() * 6);
				const die = this.diceFaces[this.randomNumber];
				this.dice_bags[0].push(die);
				console.log('XXXXXXXXXX', this.dice_bags[0]);
			},
			rollAll(){
				const rollRequired = this.dice_bags[0].length;
				this.dice_bags[0] = [];
				for (let index = 0; index < rollRequired; index++) {
					this.getRandomDie();
				} 

			}

		},
	};
</script>

<style scoped>
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
	.drop {
		display: inline-block;
		vertical-align: top;
		padding: 10px;
		margin-bottom: 20px;
		width: 540px;
    background-color: blue;
		height: 100px;
    text-align: center;
	}
</style>
