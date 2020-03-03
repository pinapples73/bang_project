export default{
  winConditions(){

    let sheriff = null;

    for(let player of this.players){
      // debugger;
      if(player.role === "sheriff"){
        sheriff = player;
      }
    }

    let outlaw = null;

    for(let player of this.players){
      if(player.role === "outlaw"){
        outlaw = player;
      }
    }

    let renegade = null;

    for(let player of this.players){
      if(player.role === "renegade"){
        renegade = player;
      }
    }

    let deputy = null;

    for(let player of this.players){
      if(player.roll === "deputy"){
        deputy = player;
      }
    }


    let result = "";

    if (sheriff.currentHealth <= 0){
      if (outlaw.currentHealth>0){
        result = "Outlaw Wins";
        alert(`Outlaws Win`);
      }
    }

    if (sheriff.currentHealth <= 0){
      if (renegade.currentHealth > 0 && deputy.currentHealth>0){
        result ="Outlaw Wins";
        alert(`Outlaws Win`);
      }
    }
    if (sheriff.currentHealth <= 0) {
      if (outlaw.currentHealth <= 0 && deputy.currentHealth <= 0){
        result = "Renegade Wins";
        alert(`Renegade Wins`);
      }
    }
    if (sheriff.currentHealth > 0) {
      if (outlaw.currentHealth <= 0 && renegade.currentHealth <= 0){
        result = "Law Wins";
        alert(`Law Win`);
      }
    }

    return result;
  }


}
