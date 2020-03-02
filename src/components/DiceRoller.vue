<template>
	<div>
		<div>
			<p :key="refreshFlag">Rolls Left: {{ rollsLeft }}  Dynamite Count: {{totalDynamiteRolled}}</p>
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
				<button id="rollbtn" v-if="rollsLeft > 0" type=button class="roll" v-on:click ="rollAll">Roll Dice</button>
			</div>
			<div>
				<button id="finishbtn" v-if="rollsLeft <= 2" type=button class="finish" v-on:click ="finishRolling">Finish Rolling</button>
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
					['shoot1', 'shoot1', 'gatlin', 'arrow', 'health'],
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
					this.dynamiteCheck();
					// this.arrowCheck();

					this.refreshFlag += 1;
					this.rollsLeft -= 1;
				}
			},
			dynamiteCheck(){
				let dynamiteCount = 0;
				for(const [index, die] of this.dice_bags[0].entries()){
					console.log(`checking dynamite`, die, index);

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
					// this.players[this.activePlayer].currentHealth -= 1;

					eventBus.$emit('tooManyDynamite');

				}
				console.log(`dynamite left:`, this.dice_bags[0]);
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
	.drag.shoot1 {
		background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKJ7di9LQDc_304Ijxz8By3atxPxkfy6kcrH5Zj9J4-IDWEyhQ');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 10px;
		border-radius: 15px;

	}

	.drag.shoot2 {
		background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRfTwChfcPQ_pBG40UjX3mav5l610yUeECGaNnto004dDPtmhNA');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;
}
	.drag.arrow {
		background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKJ7di9LQDc_304Ijxz8By3atxPxkfy6kcrH5Zj9J4-IDWEyhQ');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;
}
	.drag.health {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEX////MAADmi4vmjY3dWVnutbX43d3++Pj0zs7QHx/TNjbXWlrJAAD65ubOCQnhcnLwvr7WU1PolJTUMDDdXFzRKCj98/PdY2PmkJDrpqa0Ve5RAAABIElEQVR4nO3ZW07DMBRF0aaFAiV9ps/5T5QRxKaSkTnVWv+xzlY+72IBAAAAAAAAAAAAAAAAAGm2nyXb3vMaOO2+5u1Ovec1sByHeeOq97wGFOZTmE9hPoX5FOZTmE9hPoX5FOZTmE9hPoX5FOZTmE9hvtcvvBcL//2FdLt/qzhPhcBhmM61B/Z9D+HrqfSHWhindd/CzR8HDsNGoUKFChUqVKhQoUKFChUqVKhQoUKFChUqVNik8DLWVAKq31/6Fl4P7xWHWzHwVn/g2rXwF1bF++G997wGXv8GrDCfwnwK8ynMpzCfwnwK8ynMpzCfwnwK8ynMpzCfwnwK85ULl73nNfA4fs87PnrPa+GjpPc4AAAAAAAAAAAAAAAAAHjeD/9JKHPY46zxAAAAAElFTkSuQmCC');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;
}
	.drag.gatlin {
		background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPzuIPE4mD8kzZoEHDFUZtOLHZshHjEoEPsohQgtvn9kJxKlvt');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		margin-right: 5px;
		border-radius: 15px;}
	.drag.zdynamite {
		background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKJ7di9LQDc_304Ijxz8By3atxPxkfy6kcrH5Zj9J4-IDWEyhQ');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
			margin-right: 5px;
			border-radius: 15px;}
	.drop {
		display: inline-block;
		vertical-align: top;
		padding: 10px;
		margin-bottom: 20px;
		width: 540px;
    background-color: rgba(9, 10, 9, 0.5);
		border-radius: 15px;
		height: 100px;
    text-align: center;

	}
	#rollbtn{
		width: 100px;
		height: 40px;
		margin-bottom: 10px;
		}

		#finishbtn{
			width: 100px;
			height: 40px;
		}
</style>
