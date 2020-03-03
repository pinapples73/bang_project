<template>
	<div>
		<div>
			<p id="count-box":key="refreshFlag">Rolls Left: {{ rollsLeft }}   Dynamite Count: {{totalDynamiteRolled}}</p>
			<div v-for="(list, index) in dice_bags" :key="refreshFlag">
				<drop class="drop list" @drop="handleDrop(list, ...arguments)">
					<div v-if="rollsLeft === 3">
						<drag v-for="(item, index) in list" class="drag" :key="index" :class="{ [item]: true }" :draggable="false" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							<!-- {{ item }} -->
						</drag>
					</div>
					<div v-else-if="rollsLeft === 0">
						<drag v-for="(item, index) in list" class="drag" :key="index" :class="{ [item]: true }" :draggable="false" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							<!-- {{ item }} -->
						</drag>
					</div>
					<div v-else>
						<drag v-for="(item, index) in list" class="drag" :class="{ [item]: true }" :draggable="true" :key="index" :transfer-data="{ item: item, list: list, example: 'dice_bags' }">
							<!-- {{ item }} -->
						</drag>
					</div>
				</drop>
			</div>
			<div id="buttons">
			<div>
				<button id="rollbtn" v-if="rollsLeft > 0" type=button class="roll" v-on:click ="rollAll">Roll Dice</button>
			</div>
			<div>
				<button id="finishbtn" v-if="rollsLeft <= 2" type=button class="finish" v-on:click ="finishRolling">Finish Rolling</button>
			</div>
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
		mounted(){
			eventBus.$on(`activePlayerDiedByArrows`, () => {
				this.dice_bags = [
					[' ', ' ', ' ', ' ', ' '],
					[]
				];
				refreshFlag = -1;
				rollsLeft = 4;
				totalDynamiteRolled = 0;
			})
		},
		data() {
			return {
				dice_bags: [
					[' ', ' ', ' ', ' ', ' '],
					[]
				],
				diceFaces: ['shoot1','shoot1','health','arrow','gatlin','zdynamite'],
				refreshFlag: 0,
				rollsLeft: 3,
				totalDynamiteRolled: 0
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
					this.arrowCheck();
					this.dynamiteCheck();


					this.refreshFlag += 1;
					this.rollsLeft -= 1;
				}
			},
			dynamiteCheck(){
				let dynamiteCount = 0;
				for(const [index, die] of this.dice_bags[0].entries()){
					if(die === 'zdynamite') {
						dynamiteCount += 1;
						alert(`You rolled a dynamite. Oh crumbs!`)
					};
				};
				this.dice_bags[0].sort();
				for(let count = 0 ; count < dynamiteCount ; count ++){
					this.dice_bags[0].pop();
				};

				this.totalDynamiteRolled += dynamiteCount;
				if (this.totalDynamiteRolled >= 3) {
					alert(`You rolled ${this.totalDynamiteRolled} dynamite. Your turn has finished and you lose 1 health! Ya clumsy varmint!`);
					this.refreshFlag = 0;
					this.rollsLeft = 4;
					this.totalDynamiteRolled = 0;
					this.dice_bags = [
						[' ', ' ', ' ', ' ', ' '],
						[]
					]
					eventBus.$emit('tooManyDynamite');
				}
			},
			arrowCheck(){
				for(const die of this.dice_bags[0]) {
					if(die === 'arrow') {
						eventBus.$emit('arrowRolled');
					};
				};
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
			}
		},
	};
</script>

<style scoped>
	.drag {
		display: inline-block;
		vertical-align: top;
		padding: 10px;
		width: 80px;
		height: 80px;
    text-align: center;

	}
	.drag.shoot1 {
		background-image: url("../assets/images/shoot1.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 10px;
		border-radius: 15px;

	}

	.drag.shoot2 {
		background-image: url("../assets/images/shoot2.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;
}
	.drag.arrow {
		background-image: url("../assets/images/arrow.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;
}
	.drag.health {
		background-image: url("../assets/images/health.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;
}
	.drag.gatlin {
		background-image: url("../assets/images/gatlin.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;}
	.drag.zdynamite {
		background-image: url("../assets/images/dynomite.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
			margin-right: 5px;
			border-radius: 15px;}
	.drop {
		display: inline-block;
		vertical-align: top;
		padding: 10px;
		margin: 20px;
		width: 600px;
		background: rgba(9, 10, 9, 0.5);
	  box-shadow: 0 0 25px 1px black;
		border: 5px solid black;
		border-radius: 15px;
		height: 100px;
    text-align: center;


	}
	#rollbtn{
		width: 120px;
	  height: 80px;
	  margin-top: 15px;
		margin-right: 20px;
	  border-radius: 11px;
	  box-shadow: 0 0 25px 1px black;
	  font-size: 20px;
	  background-color: rgba(156, 155, 153, 0.5);
	  border: 5px solid black;
	}
	#rollbtn:hover{
	  width: 120px;
	  height: 80px;
	  margin-top: 15px;
	  border-radius: 11px;
	  box-shadow: 0 0 25px 1px black;
	  font-size: 20px;
	  background-color: rgba(39, 38, 37, 0.5);
	  border: 5px solid black;
	}

		#finishbtn{
			width: 120px;
		  height: 80px;
		  margin-top: 15px;
		  border-radius: 11px;
		  box-shadow: 0 0 25px 1px black;
		  font-size: 20px;
		  background-color: rgba(156, 155, 153, 0.5);
		  border: 5px solid black;
		}
		#finishbtn:hover{
		  width: 120px;
		  height: 80px;
		  margin-top: 15px;
		  border-radius: 11px;
		  box-shadow: 0 0 25px 1px black;
		  font-size: 20px;
		  background-color: rgba(39, 38, 37, 0.5);
		  border: 5px solid black;
		}
		#buttons{
			display: flex;
			margin: 0 auto;
			justify-content: center
		}

		#count-box{

			background: rgba(9, 10, 9, 0.5);
		  box-shadow: 0 0 25px 1px black;
			border: 5px solid black;
			border-radius: 15px;
			height: 50px;
			text-align: center;
			font-size: 30px;
			font-weight: bold;
			padding: 1% ;
			vertical-align: middle;
			display: flex;
 			justify-content: center;
 			align-items: center;
		}

</style>
