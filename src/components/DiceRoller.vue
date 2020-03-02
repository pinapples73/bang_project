<template>
	<div>
		<div>
			<p :key="refreshFlag">{{ rollsLeft }}</p>
			<div v-for="(list, index) in dice_bags" :key="refreshFlag">
				<drop class="drop list" @drop="handleDrop(list, ...arguments)">
					<div v-if="rollsLeft === 3">
						<drag v-for="(item, index) in list" class="drag" :key="index" :class="{ [item]: true }" :draggable="false" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							{{ item }}
						</drag>
					</div>
					<div v-else-if="rollsLeft === 0">
						<drag v-for="(item, index) in list" class="drag" :key="index" :class="{ [item]: true }" :draggable="false" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							{{ item }}
						</drag>
					</div>
					<div v-else>
						<drag v-for="(item, index) in list" class="drag" :class="{ [item]: true }" :draggable="true" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
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
		props: ['activePlayer'],
		data() {
			return {
				dice_bags: [
					['shoot1', 'shoot1', 'gatlin', 'arrow', 'health'],
					[]
				],
				diceFaces: ['shoot1','shoot1','health','arrow','gatlin','dynamite'],
				refreshFlag: 0,
				rollsLeft: 3,
				dynamiteCount: 0
			};
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
					this.refreshFlag += 1;
					this.dynamiteCheck();
					// this.arrowCheck();

					this.refreshFlag += 1;
					this.rollsLeft -= 1;
				}
			},
			dynamiteCheck(){
				let dynamiteIndex = [];
				for(const [index, die] of this.dice_bags[0].entries()){
					console.log(`checking dynamite`, die, index);

					if(die === 'dynamite') {
						this.dynamiteCount += 1;
						dynamiteIndex.push(index);
						alert(`You rolled a dynamite. Oh crumbs!`)
					};
				};
				for(const dynamitePoition of dynamiteIndex) {
					this.dice_bags[0].splice(dynamitePoition, 1);
				}
				console.log(`dynamite to remove`, dynamiteIndex);
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

				const payload = this.dice_bags[1];
				eventBus.$emit("finshedRolling", payload);
				console.log(`DICE BAGS!!!!`);
				// debugger;
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
