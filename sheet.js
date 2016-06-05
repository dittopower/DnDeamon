
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
	return {Name:name,Mod:mod,SPMod:spmod,FLY:fly,Stealth:stealth,Space:space,Reach:reach,TH:height,TW:weight};
}

Abilities = ["STR","DEX","CON","INT","WIS","CHA"];
Skills = ["Acrobatics", "Appraise", "Bluff", "Climb", "Craft", "Diplomacy", "Disable Device", "Disguise", "Escape Artist", "Fly", "Handle Animal", "Heal", "Intimidate", "Knowledge Arcana", "Knowledge Dungeoneering", "Knowledge Engineering", "Knowledge Geography", "Knowledge History", "Knowledge Local", "Knowledge Nature", "Knowledge Nobility", "Knowledge Planes", "Knowledge Religion", "Linguistics", "Perception", "Perform", "Profession", "Ride", "Sense Motive", "Sleight of Hand", "Spellcraft", "Stealth", "Survival", "Swim", "Use Magic Device"];
Sizes = [];
Sizes.push(new Size("Fine",			8,	-8,	8,	16,		0.5,	0,	[0.5,">"],	[0.125,">"]));
Sizes.push(new Size("Diminutive",	4,	-4,	6,	12,		1,		0,	[1,">"],	[1,">"]));
Sizes.push(new Size("Tiny",			2,	-2,	4,	8,		2.5,	0,	[2,">"],	[8,">"]));
Sizes.push(new Size("Small",		1,	-1,	2,	4,		5,		5,	[4,">"],	[60,">"]));
Sizes.push(new Size("Medium",		0,	0,	0,	0,		5,		5,	[8,">"],	[500,">"]));
Sizes.push(new Size("Large",		-1,	1,	-2,	-4,		10,		10,	[16,">"],	[4000,">"]));
Sizes.push(new Size("Huge",			-2,	2,	-4,	-8,		15,		15,	[32,">"],	[32000,">"]));
Sizes.push(new Size("Gargantuan",	-4,	4,	-6,	-12,	20,		20,	[64,">"],	[250000,">"]));
Sizes.push(new Size("Colossal",		-8,	8,	-8,	-16,	30,		30,	[64,"<"],	[250000,"<"]));

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
		this.skill["Craft"] =					new Skill(false,false,"INT",0,0);
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
	this.bab = 0;
	this.armour = [];
		this.armour["armour"] = 0;
		this.armour["shield"] = 0;
		this.armour["natural"] = 0;
		this.armour["dodge"] = 0;
		this.armour["deflection"] = 0;
		this.armour["misc"] = 0;
		this.armour["stat"] = 'DEX';
		this.armour["max"] = 1000;
	this.saves = []
		this.saves['fortitude'] = new Save(0,"CON");
		this.saves['reflex'] = new Save(0,"DEX");
		this.saves['will'] = new Save(0,"WIS");
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
		//need circumstance bonus
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
		var result = 0;
		for(ia = 0; ia < this.stats.length; ia++){
			result += this.stats[ia][1].bab;
		}
		return result;
	}
	this.CMB = function (){
		var result = this.BAB();
		result += this.ability_mod("STR");
		result += this.Size.SPMod;
		return result;
	}
	this.CMD = function (){
		var result = this.BAB();
		result += this.ability_mod("STR");
		result += this.ability_mod("DEX");
		result += this.Size.SPMod;
		result += 10;
		return result;
	}
}


//Rolls
function roll(num){
	return Math.floor(Math.random()*num+1);
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
	result += roll(20);
	chat_msg(text+": " +result);
}
function roll_skl(stat){
	var result = 0;
	result += characters[current].skill_score(stat);
	if(!isNaN(result)){
		result += roll(20);
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
	result += roll(20);
	chat_msg("Save: "+text+": " +result);
}
function roll_CMB(){
	var result = 0;
	result += characters[current].CMB();
	result += roll(20);
	chat_msg("Combat Maneuver: " +result);
}
function roll_CMD(){
	var result = 0;
	result += characters[current].CMD();
	result += roll(20);
	chat_msg("Defence Maneuver: " +result);
}
