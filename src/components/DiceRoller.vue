<template>
	<div>
		<div>
			<p :key="refreshFlag">{{ rollsLeft }}</p>
			<div v-for="(list, index) in dice_bags" :key="refreshFlag">
				<drop class="drop list" @drop="handleDrop(list, ...arguments)">
					<div v-if="rollsLeft === 3">
						<drag v-for="item in list" class="drag" :key="item" :class="{ [item]: true }" :draggable="false" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							{{ item }}
						</drag>
					</div>
					<div v-else-if="rollsLeft === 0">
						<drag v-for="item in list" class="drag" :key="item" :class="{ [item]: true }" :draggable="false" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							{{ item }}
						</drag>
					</div>
					<div v-else>
						<drag v-for="item in list" class="drag" :key="item" :class="{ [item]: true }" :draggable="true" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							{{ item }}
						</drag>
					</div>
				</drop>
			</div>
			<div>
				<button v-if="rollsLeft > 0" type=button class="roll" v-on:click ="rollAll">Roll Dice</button>
			</div>
			<div>
				<button v-if="rollsLeft <= 2" type=button class="finish" v-on:click ="finishRolling">Finish Rolling</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {eventBus} from '../main.js';
	import { Drag, Drop } from 'vue-drag-drop';


	export default {
		name: 'dice-roller',
		components: { Drag, Drop },
		data() {
			return {
				dice_bags: [
					['shoot1', 'shoot2', 'gatlin', 'arrow', 'health'],
					[]
				],
				diceFaces: ['shoot1','shoot2','health','arrow','gatlin','dynamite'],
				refreshFlag: 0,
				rollsLeft: 3
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

			},
			rollAll(){
				if (this.rollsLeft > 0) {
					const rollRequired = this.dice_bags[0].length;
					this.dice_bags[0] = [];
					for (let index = 0; index < rollRequired; index++) {
						this.getRandomDie();
					};
					console.log('DICE ROLL', this.dice_bags[0]);
					this.refreshFlag += 1;
					this.rollsLeft -= 1;
				}
			},
			finishRolling(){
				if(this.dice_bags[0].length > 0) {
					for (const die of this.dice_bags[0]) {
						this.dice_bags[1].push(die);
					};
				};
				this.dice_bags[0] = [];
				this.rollsLeft = 0;
				this.refreshFlag += 1;
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
	.drag.dynamite { background: red; color: white}
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
