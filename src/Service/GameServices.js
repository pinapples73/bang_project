const sheriff = null;

for(player of players){
    if(player.role === "sheriff"){
        sheriff = player;
    }
}

const outlaw = null; 

    for(player of players){
        if(player.role === "outlaw"){
            outlaw = player;
        }
    }

const renegade = null; 

    for(player of players){
        if(player.role === "renegade"){
            renegade = player;
        }
    }

const deputy = null; 

for(player of players){
    if(player.roll === "deputy"){
        deputy = player; 
    }
}


const result = "";

winCondition(){

if (sheriff.currentHealth <= 0){
    if (outlaw.currentHealth>0){
        result = "Outlaw Wins"
    }
}

if (sheriff.currentHealth <= 0){
    if (renegade.currentHealth > 0 && deputy.currentHealth>0){
        result ="Outlaw Wins"
    } 
}
if (sheriff.currentHealth <= 0) {
  if (outlaw.currentHealth <= 0 && deputy.currentHealth <= 0){
    result = "Renegade Wins";
    } 
}
if (sheriff.currentHealth > 0) {
    if (outlaw.currentHealth <= 0 && renegade.currentHealth <= 0){
    result = "Law Wins";
    }
}


return result;
}
eventBus.$emit('winConidtion');