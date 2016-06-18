
//Rolls
function roll(num){
	return Math.floor(Math.random()*num+1);
}
function roll_d20(threashold){
	if(threashold == undefined){
		threashold = 20;
	}
	var result = roll(20);
	if(result == 20){
		chat_msg("Natural 20!!","crit_suc");
		sound_play(audio_crit_sucess);
	}else if(result >= threashold){
		chat_msg("Crit: "+result,"crit_suc");
		sound_play(audio_crit_sucess);
	}else if(result == 1){
		chat_msg("Natural 1...","crit_fail");
		sound_play(audio_crit_failure);
	}
	return result;
}

function roll_abl(stat){
	var result = 0;
	var text = '';
	switch(stat){
		case "STR":
			result = characters[current].ability_mod('STR');
			text = 'Strength';
			break;
		case "DEX":
			result = characters[current].ability_mod('DEX');
			text = 'Dexterity';
			break;
		case "CON":
			result = characters[current].ability_mod('CON');
			text = 'Consititution';
			break;
		case "INT":
			result = characters[current].ability_mod('INT');
			text = 'Intelligence';
			break;
		case "WIS":
			result = characters[current].ability_mod('WIS');
			text = 'Wisdom';
			break;
		case "CHA":
			result = characters[current].ability_mod('CHA');
			text = 'Charisma';
			break;
		default:
			text = 'None';
	}
	result += roll_d20();
	chat_msg(text+": " +result);
}
function roll_skl(stat){
	var result = 0;
	result += characters[current].skill_score(stat);
	if(!isNaN(result)){
		result += roll_d20();
	}else{
		result = "Skill Requires Training";
	}
	chat_msg(stat+": " +result);
}
function roll_save(stat){
	var result = 0;
	var text = '';
	switch(stat){
		case "fort":
			result = characters[current].save_fort();
			text = 'Fortitude';
			break;
		case "will":
			result = characters[current].save_will();
			text = 'Will';
			break;
		case "refl":
			result = characters[current].save_refl();
			text = 'Reflex';
			break;
		default:
			text = 'None';
	}
	result += roll_d20();
	chat_msg("Save: "+text+": " +result);
}
function roll_CMB(){
	var result = 0;
	result += characters[current].CMB();
	result += roll_d20();
	chat_msg("Combat Maneuver: " +result);
}
function roll_CMD(){
	var result = 0;
	result += characters[current].CMD();
	result += roll_d20();
	chat_msg("Defence Maneuver: " +result);
}



function rollatk(stat,misc){
	stat = stat.toLowerCase();
	if(misc == undefined){
		misc = 0;
	}
	var result = 0;
	result += misc;
	switch(stat){
		case "str":
		case "melee":
			result += characters[current].ability_mod("STR");
			break;
		case "dex":
		case "thrown":
		case "ranged":
			result += characters[current].ability_mod("DEX");
			break;
	}
	result += characters[current].BABmax();
	result += characters[current].Size.Mod;
	result += roll_d20();
	return result;
}
function atk_abl(stat){
	stat = stat.toLowerCase();
	var result = 0;
	switch(stat){
		case "STR":
		case "melee":
			result += characters[current].ability_mod("STR");
			break;
		case "DEX":
		case "ranged":
		case "thrown":
			result += characters[current].ability_mod("DEX");
			break;
	}
	result += characters[current].BABmax();
	return result;
}
function weapon_atk_abl(data){
	if(checkFeat("Weapon Finesse",characters[current])){
		var Pat = RegExp("elven curve blade|rapier|spiked chain","i");
		if(characters[current].weapons[data].Hands == "L" || Pat.test(characters[current].weapons[data].Name)){
			return characters[current].ability_mod("DEX");
		}
	}
	if(characters[current].weapons[data].Use == "Melee"){
		return characters[current].ability_mod("STR");
	}
	if(characters[current].weapons[data].Use == "Ranged"){
		return characters[current].ability_mod("DEX");
	}
	if(characters[current].weapons[data].Use == "Thrown"){
		return characters[current].ability_mod("DEX");
	}
	return 0;
}

function weapon_atk_bonus(data){
	var result = 0;
	result += weapon_atk_abl(data);
	result += UI['atk_bonus'];
	switch(characters[current].weapons[data].Masterwork){
		case "Masterwork":
			result += 1;
			break;
		case "":
			break;
		default:
			result += characters[current].weapons[data].Masterwork;
	}
	return result;
}

function roll_atk_melee(){
	chat_msg("Melee Attack: " +rollatk("melee"));
}
function roll_atk_range(penalty){
	chat_msg("Ranged Attack: " +rollatk("ranged",penalty) + " - range penalty");
}
function roll_atk_touch(){
	chat_msg("Melee Touch Attack: " +rollatk("melee"));
}
function roll_atk_Rtouch(){
	chat_msg("Ranged Touch Attack: " +rollatk("ranged"));
}

function roll_Watk(data){
	var temp = roll_d20(characters[current].weapons[data].Crit[0]);
	if(temp >= characters[current].weapons[data].Crit[0]){
		chat_msg(characters[current].weapons[data].Name + " Attack: " +(temp+weapon_atk_bonus(data)));
		chat_msg("Confirm Crit: " +(roll_d20()+weapon_atk_bonus(data)));
		
	}else{
		chat_msg(characters[current].weapons[data].Name + " Attack: " +(temp+weapon_atk_bonus(data)));
	}
}
function roll_Wdmg(data){
	var result = 0;
	for(var i = 0;i < characters[current].weapons[data].DMG[0];i++){
		result += roll(characters[current].weapons[data].DMG[1]);
	}
	var mod = characters[current].ability_mod("STR");
	if(checkStat("Fatal Finesse",characters[current])){
		var Pat = RegExp("elven curve blade|rapier|spiked chain","i");
		if(characters[current].weapons[data].Hands == "L" || Pat.test(characters[current].weapons[data].Name)){
			mod = characters[current].ability_mod("DEX");
		}
	}
	if(characters[current].weapons[data].Use == "Melee"){
		switch(characters[current].weapons[data].Hands){
			case "2":
				result += (mod *1.5);
				break;
			case "1":
			case "L":
				result += mod;
				break;
		}
	}
	var Temp = "";
	for(var i = 0;i < characters[current].weapons[data].Bonus.length;i++){
		var Total = 0;
		Temp += ", "
		for(var ia = 0;ia < characters[current].weapons[data].Bonus[i][0];ia++){
			Total += roll(characters[current].weapons[data].Bonus[i][1]);
		}
		Temp += Total+"-"+characters[current].weapons[data].Bonus[i][2];
	}
	chat_msg(characters[current].weapons[data].Name + " DMG: " +result +"-"+characters[current].weapons[data].Type +Temp);
}
function roll_W(data){
	roll_Watk(data);
	roll_Wdmg(data);
}