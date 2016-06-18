
function scale(base,rate,stat,per,offset,max){
	if(base == undefined){
		base = 0;
	}
	if(rate == undefined){
		rate = 0;
	}
	if(stat == undefined){
		stat = "";
	}
	if(per == undefined){
		per = 1;
	}
	if(offset == undefined){
		offset = 0;
	}
	if(max == undefined){
		max = 0;
	}
	return [base,rate, stat, per, offset, max];
}

function Scaled(data){
	var result = 0;
	var resultb = 0;
	result += data[0];
	switch(data[2]){
		case "Level":
			resultb = characters[current].Level;
			break;
		default:
			if(Abilities.indexOf(data[2]) > -1){
				resultb = characters[current].ability_mod(data[2]);
			}
	}
	result += data[1] * (resultb - data[4])/data[3];
	if(data[5] != 0){
		result = Math.min(data[5],result);
	}
	return result;
}

function isScale(data){
	if(typeof(data) != "object"){
		return false;
	}else if(data.length != 6){
		return false;
	}
	return true;
}

//spells
function find_Castable(name){
	for(var i = 0; Castable.length > i; i++){
		if(Castable[i][0] == name){
			return i;
		}
	}
	return null;
}