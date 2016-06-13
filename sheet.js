/*
Character Implementations
*/
ItemId = 0;
function Ability(score,bonus,circumstance){
	if(circumstance == undefined){
		circumstance = "";
	}
	return [score,bonus,circumstance];
}

function Skill(trained,clas,ability,rank,bonus,circumstance){
	if(circumstance == undefined){
		circumstance = "";
	}
	return [trained,clas,ability,rank,bonus,circumstance];
}
function Save(base,ability,magic,misc){
	if(misc == undefined){
		misc = 0;
	}
	if(magic == undefined){
		magic = 0;
	}
	return {Base:base,Ability:ability,Magic:magic,Misc:misc};
}
function Size (name,mod,spmod,fly,stealth,space,reach,height,weight){
	return {Name:name,Mod:mod,SPMod:spmod,Fly:fly,Stealth:stealth,Space:space,Reach:reach,TH:height,TW:weight};
}

function Stats(str,dex,con,intt,wis,cha){
	this.ability = [];
		this.ability["STR"] = new Ability(str,0);
		this.ability["DEX"] = new Ability(dex,0);
		this.ability["CON"] = new Ability(con,0);
		this.ability["INT"] = new Ability(intt,0);
		this.ability["WIS"] = new Ability(wis,0);
		this.ability["CHA"] = new Ability(cha,0);
	this.skill = [];
		this.skill["Acrobatics"] =				new Skill(false,false,"DEX",0,0);
		this.skill["Appraise"] = 				new Skill(false,false,"INT",0,0);
		this.skill["Bluff"] = 					new Skill(false,false,"CHA",0,0);
		this.skill["Climb"] = 					new Skill(false,false,"STR",0,0);
		this.skill["Craft"] =					new Skill( true,false,"INT",0,0);
		this.skill["Diplomacy"] = 				new Skill(false,false,"CHA",0,0);
		this.skill["Disable Device"] = 			new Skill( true,false,"DEX",0,0);
		this.skill["Disguise"] = 				new Skill(false,false,"CHA",0,0);
		this.skill["Escape Artist"] = 			new Skill(false,false,"DEX",0,0);
		this.skill["Fly"] = 					new Skill(false,false,"DEX",0,0);
		this.skill["Handle Animal"] = 			new Skill( true,false,"CHA",0,0);
		this.skill["Heal"] = 					new Skill(false,false,"WIS",0,0);
		this.skill["Intimidate"] = 				new Skill(false,false,"CHA",0,0);
		this.skill["Knowledge Arcana"] = 		new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Dungeoneering"] = new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Engineering"] = 	new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Geography"] = 	new Skill( true,false,"INT",0,0);
		this.skill["Knowledge History"] = 		new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Local"] = 		new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Nature"] = 		new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Nobility"] = 		new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Planes"] = 		new Skill( true,false,"INT",0,0);
		this.skill["Knowledge Religion"] = 		new Skill( true,false,"INT",0,0);
		this.skill["Linguistics"] = 			new Skill( true,false,"INT",0,0);
		this.skill["Perception"] = 				new Skill(false,false,"WIS",0,0);
		this.skill["Perform"] = 				new Skill(false,false,"CHA",0,0);
		this.skill["Profession"] = 				new Skill( true,false,"WIS",0,0);
		this.skill["Ride"] = 					new Skill(false,false,"DEX",0,0);
		this.skill["Sense Motive"] = 			new Skill(false,false,"WIS",0,0);
		this.skill["Sleight of Hand"] = 		new Skill( true,false,"DEX",0,0);
		this.skill["Spellcraft"] = 				new Skill( true,false,"INT",0,0);
		this.skill["Stealth"] = 				new Skill(false,false,"DEX",0,0);
		this.skill["Survival"] = 				new Skill(false,false,"WIS",0,0);
		this.skill["Swim"] = 					new Skill(false,false,"STR",0,0);
		this.skill["Use Magic Device"] = 		new Skill( true,false,"CHA",0,0);
	this.bab = [];
		this.bab.push(0);
	this.armour = [];
		this.armour["armour"] = 0;
		this.armour["shield"] = 0;
		this.armour["natural"] = 0;
		this.armour["dodge"] = 0;
		this.armour["deflection"] = 0;
		this.armour["misc"] = 0;
		this.armour["stat"] = 'DEX';
		this.armour["max"] = 1000;
	this.SpellResistance = 0;
	this.concentration = 0;
	this.resistance = [];
	for(var i = 0;i< EnergyTypes.length; i++){
		this.resistance[EnergyTypes[i]] = 0;
	}
	this.saves = []
		this.saves['fortitude'] = new Save(0,"CON");
		this.saves['reflex'] = new Save(0,"DEX");
		this.saves['will'] = new Save(0,"WIS");
	this.HP = 0;
	this.Spells = [];
	this.Abilities = [];
}

function Money(cp,sp,gp,pp){
	return cp + sp*100 + gp*100 + pp*100;
}
function Item(name, w, cost){
	this.Name = name;
	this.Id = ItemId;
	ItemId++;
	this.Weight = w;
	this.Cost = cost;
}
function Weapon(name, hands, proficency, use, dmg, typ, crit, range, ammo, w, cost){
	this.Item = new Item(name, w, cost);
	this.Name = this.Item.Name;
	this.Id = this.Item.ItemId;
	this.Hands = hands;
	this.DMG = dmg;
	this.Proficency = proficency;
	this.Use = use;
	this.Type = typ;
	this.Crit = crit;
	this.Range = range;
	this.Ammo = ammo;
	this.Weight = this.Item.Weight;
	this.Cost = this.Item.Cost;
}

function as(name,typ,range,save,resist,dmg,effect,area){
	this.Name = name;
	this.Type = typ;
	this.r = range;
	this.Area = function(){
		return Scaled(r);
	}
	this.s = save;
	this.Resistance = resist;
	this.d = dmg;
	this.Area = function(){
		return Scaled(d);
	}
	this.Effect = effect;
	this.a = area;
	this.Area = function(){
		return Scaled(a);
	}
}

function scale(base,rate,stat,per){
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
	return [base,rate, stat, per];
}

function Scaled(data){
	var result = 0;
	result += data[0];
	switch(data[2]){
		case "Level":
			result += (data[1] * characters[current].Level * data[3]);
			break;
		default:
			if(Abilities.indexOf(data[2]) > -1){
				result += (data[1] * characters[current].ability_mod(data[2]) * data[3]);
			}
	}
	return data;
}


function Character (name,player,level,race,clas,al,str,dex,con,intt,wis,cha,deity,HL,g,h,w,s,hair,eye){
	this.Name = name;
	this.Player = player;
	this.Level = level;
	this.Race = race;
	this.Class = clas
	this.Alignment = al;
	this.Deity = deity;
	this.Homeland = HL;
	this.Gender = g;
	//need age
	this.Height = h;
	this.Weight = w;
	this.Size = s;
	this.Hair = hair;
	this.Eye = eye;
	this.stats = [];
	this.stats.push( ['Base',new Stats(str,dex,con,intt,wis,cha),'perm'] );
	
	this.ability_score = function (what){
		var result = 0;
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].ability[what][0];
		}
		//need circumstance bonus
		return result;
	}
	this.ability_mod = function (what){
		var result = 0;
		var resultb = 0;
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].ability[what][0];
			resultb += this.stats[ia][1].ability[what][1];
		}
		//need circumstance bonus
		return Math.floor((result-10)/2)+resultb;
	}
	this.skill_score = function (what){
		var result = 0;
		var resultb = 0;
		var trained = this.stats[0][1].skill[what][0];
		var clas = this.stats[0][1].skill[what][1];
		for(ia = 0; ia < this.stats.length; ia++){
			trained = trained || this.stats[ia][1].skill[what][0];
			clas = clas || this.stats[ia][1].skill[what][1];
			resultb += this.stats[ia][1].skill[what][3];
			result += this.stats[ia][1].skill[what][4];
		}
		result += this.ability_mod(this.stats[0][1].skill[what][2]);
		if(clas || !trained){
			result += resultb;
		}
		if(!clas && trained){
			result = NaN;
		}
		switch(what){
			case "Fly":
				result += characters[current].Size.Fly;
				break;
			case "Stealth":
				result += characters[current].Size.Stealth;
				break;
		}
		//need circumstance bonus
		return result;
	}
	
	this.sr = function (){
		var result = 0;
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].SpellResistance;
		}
		return result;
	}
	this.concentration = function (){
		var result = 0;
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].concentration;
		}
		return result;
	}
	this.resistance = function (data){
		var result = 0;
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].resistance[data];
		}
		return result;
	}
	this.ac = function (flat){
		if(flat == undefined){
			flat = false;
		}
		var result = 10;
		var resultb = 1000;
		var resultc = "DEX";
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].armour["armour"] +
			this.stats[ia][1].armour["shield"] +
			this.stats[ia][1].armour["natural"] +
			this.stats[ia][1].armour["dodge"] +
			this.stats[ia][1].armour["deflection"] +
			this.stats[ia][1].armour["misc"];
			resultb = Math.min(this.stats[ia][1].armour["max"],resultb);
			if(this.stats[ia][1].armour["stat"] != "DEX"){
				resultc = this.stats[ia][1].armour["stat"];
			}
		}
		if(!flat){
			result += Math.min(this.ability_mod(resultc),resultb);
		}
		result += this.Size.Mod;
		return result;
	}
	this.ac_touch = function (flat){
		if(flat == undefined){
			flat = false;
		}
		var result = 10;
		var resultb = 1000;
		var resultc = "DEX";
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].armour["dodge"] +
			this.stats[ia][1].armour["deflection"] +
			this.stats[ia][1].armour["misc"];
			resultb = Math.min(this.stats[ia][1].armour["max"],resultb);
			if(this.stats[ia][1].armour["stat"] != "DEX"){
				resultc = this.stats[ia][1].armour["stat"];
			}
		}
		if(!flat){
			result += Math.min(this.ability_mod(resultc),resultb);		
		}
		result += this.Size.Mod;
		return result;
	}
	
	this.save_fort = function (){
		var result = 0;
		var resultb = "CON";
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].saves['fortitude'].Base;
			result += this.stats[ia][1].saves['fortitude'].Magic;
			result += this.stats[ia][1].saves['fortitude'].Misc;
			if("CON" != this.stats[ia][1].saves['fortitude'].Ability){
				resultb = this.stats[ia][1].saves['fortitude'].Ability;
			}
		}
		result += this.ability_mod(resultb);
		return result;
	}
	this.save_refl = function (){
		var result = 0;
		var resultb = "DEX";
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].saves['reflex'].Base;
			result += this.stats[ia][1].saves['reflex'].Magic;
			result += this.stats[ia][1].saves['reflex'].Misc;
			if("DEX" != this.stats[ia][1].saves['reflex'].Ability){
				resultb = this.stats[ia][1].saves['reflex'].Ability;
			}
		}
		result += this.ability_mod(resultb);
		return result;
	}
	this.save_will = function (){
		var result = 0;
		var resultb = "WIS";
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].saves['will'].Base;
			result += this.stats[ia][1].saves['will'].Magic;
			result += this.stats[ia][1].saves['will'].Misc;
			if("WIS" != this.stats[ia][1].saves['will'].Ability){
				resultb = this.stats[ia][1].saves['will'].Ability;
			}
		}
		result += this.ability_mod(resultb);
		return result;
	}
	this.BAB = function (){
		var result = [];
		for(ia = 0; ia < this.stats.length; ia++){
			for(var i = 0; i < this.stats[ia][1].bab.length; i++){
				if(result[i] == undefined){
					result[i] = 0;
				}
				result[i] += this.stats[ia][1].bab[i];
			}
		}
		return result;
	}
	this.BABmax = function(){
		var result = this.BAB();
		var resultb = 0;
		for(var i = 0; i < result.length; i++){
			resultb = Math.max(result[i],resultb);
		}
		return resultb;
	}
	this.CMB = function (){
		var result = this.BABmax();
		result += this.ability_mod("STR");
		result += this.Size.SPMod;
		return result;
	}
	this.CMD = function (){
		var result = this.BABmax();
		result += this.ability_mod("STR");
		result += this.ability_mod("DEX");
		result += this.Size.SPMod;
		result += 10;
		return result;
	}
	
	this.weapons = [];
	this.Equip = function(data){
		//add checks for hands and stuff here
		weapons.push(data);
	}
	
	this.Spells = function(){
		var result = [];
		for(var i = 0; i < this.stats.length; i++){
			result = result.concat(this.stats[i][1].Spells);
		}
		return result;
	}
	this.Abilities = function(){
		var result = [];
		for(var i = 0; i < this.stats.length; i++){
			result = result.concat(this.stats[i][1].Abilities);
		}
		return result;
	}
}


//Rolls
function roll(num){
	return Math.floor(Math.random()*num+1);
}
function roll_d20(){
	var result = roll(20);
	if(result == 20){
		chat_msg("Natural 20!!","crit_suc");
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
		case "STR":
		case "melee":
			result += characters[current].ability_mod("STR");
			break;
		case "DEX":
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
			result += characters[current].ability_mod("DEX");
			break;
	}
	result += characters[current].BABmax();
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
	if(characters[current].weapons[data].Use == "Melee"){
		chat_msg(characters[current].weapons[data].Name + " Attack: " +rollatk("melee"));
	}else{
		chat_msg(characters[current].weapons[data].Name + " Attack: " +rollatk("ranged"));
	}
}
function roll_Wdmg(data){
	var result = 0;
	for(var i = 0;i < characters[current].weapons[data].DMG[0];i++){
		result += roll(characters[current].weapons[data].DMG[1]);
	}
	if(characters[current].weapons[data].Use == "Melee"){
		switch(characters[current].weapons[data].Hands){
			case "2":
				result += (characters[current].ability_mod("STR") *1.5);
				break;
			case "1":
				result += characters[current].ability_mod("STR");
				break;
		}
	}
	chat_msg(characters[current].weapons[data].Name + " DMG: " +result);
}