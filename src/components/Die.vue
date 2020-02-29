<template>
  <div>
      <title> Dice Roller Game</title>
        <div class="container"> </div>
        <div  class="dice">
            <!-- {{this.die}} -->
        </div>
    </div>
</template>

<script>
import {eventBus} from '../main.js';
export default {
    name:'die',
data(){
    return{
        randomNumber: null,
        diceFaces: ['shoot1','shoot2','health','arrow','gatlin','dynamite'],
        die: null
    }

},
mounted() {

},
computed:{
    if (die) {
        
        this.randomNumber = Math.floor(Math.random() * 6);
        this.die = this.diceFaces[this.randomNumber];
        // eventBus.$emit("dice-generated", this.die);
        
    }
},
methods:{
    // getRandomDiceFace() {
    //     this.randomNumber = Math.floor(Math.random() * 6) + 1;
    //     const this.die = this.diceFaces[this.randomNumber];
    // }
    
}   

}
</script>

<style>
.container{
    text-align: center; 
       
       
       /* margin: 30px auto */
}
 .dice{
     display:inline-block;
     text-align: center;
     width: 80px;
     height: auto;

 }
</style>
