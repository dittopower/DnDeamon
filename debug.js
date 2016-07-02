//fuck off page refreshing
//setTimeout(function(){clearInterval(tick)},2000);


function totalranks(){
	var ranks = 0;
	for(ib = 0; ib < Skills.length;ib++){
	for(ic = 0; ic < characters[current].stats.length; ic++){
	ranks += characters[current].stats[ic][1].skill[Skills[ib]][3];
	}
	}
	console.log(ranks);
}




///Testing
function loadChars(){
ninja = "Ajax";
current = ninja;
characters[ninja] = new Character(ninja,'Damon');
characters[ninja].stats[0][1].ability['STR'][0] = 10;
characters[ninja].stats[0][1].ability['DEX'][0] = 16;
characters[ninja].stats[0][1].ability['CON'][0] = 14;
characters[ninja].stats[0][1].ability['INT'][0] = 10;
characters[ninja].stats[0][1].ability['WIS'][0] = 14;
characters[ninja].stats[0][1].ability['CHA'][0] = 14;
characters[ninja].Race = "Drow";

characters[ninja].Money = Money(0,2,1163);

ninjarace = new Stats(0,2,-2,0,0,2);
ninjarace.skill['Stealth'][5].push(["light dim less",2]);
ninjarace.skill['Intimidate'][5].push(["light dim less",2]);
ninjarace.SpellResistance = 16;
characters[ninja].stats.push(["Drow",ninjarace,"Race"]);
ninjarace.Abilities.push(find_Castable("Dancing Lights"));
ninjarace.Abilities.push(find_Castable("Darkness"));
ninjarace.Abilities.push(find_Castable("Faerie Fire"));

ninjaclass = new Stats(0,0,0,0,0,0);
ninjaclass.level = 10;
ninjaclass.bab[0] = 7;
ninjaclass.bab[1] = 2;
ninjaclass.saves['fortitude'].Base = 3;
ninjaclass.saves['reflex'].Base = 7;
ninjaclass.saves['will'].Base = 3;
ninjaclass.skill['Acrobatics'][1] = true;
ninjaclass.skill['Appraise'][1] = true;
ninjaclass.skill['Bluff'][1] = true;
ninjaclass.skill['Climb'][1] = true;
ninjaclass.skill['Craft'][1] = true;
ninjaclass.skill['Diplomacy'][1] = true;
ninjaclass.skill['Disable Device'][1] = true;
ninjaclass.skill['Disguise'][1] = true;
ninjaclass.skill['Escape Artist'][1] = true;
ninjaclass.skill['Intimidate'][1] = true;
ninjaclass.skill['Knowledge Local'][1] = true;
ninjaclass.skill['Knowledge Nobility'][1] = true;
ninjaclass.skill['Linguistics'][1] = true;
ninjaclass.skill['Perception'][1] = true;
ninjaclass.skill['Perform'][1] = true;
ninjaclass.skill['Profession'][1] = true;
ninjaclass.skill['Sense Motive'][1] = true;
ninjaclass.skill['Sleight of Hand'][1] = true;
ninjaclass.skill['Stealth'][1] = true;
ninjaclass.skill['Swim'][1] = true;
ninjaclass.skill['Use Magic Device'][1] = true;

ninjaclass.skill['Acrobatics'][3] = 5;
ninjaclass.skill['Appraise'][3] = 1;
ninjaclass.skill['Bluff'][3] = 6;
ninjaclass.skill['Climb'][3] = 5;
ninjaclass.skill['Craft'][3] = 1;
ninjaclass.skill['Diplomacy'][3] = 1;
ninjaclass.skill['Disable Device'][3] = 10;
ninjaclass.skill['Disguise'][3] = 1;
ninjaclass.skill['Escape Artist'][3] = 5;
ninjaclass.skill['Intimidate'][3] = 6;
ninjaclass.skill['Knowledge Local'][3] = 4;
ninjaclass.skill['Knowledge Nobility'][3] = 4;
ninjaclass.skill['Linguistics'][3] = 1;
ninjaclass.skill['Perception'][3] = 10;
ninjaclass.skill['Sense Motive'][3] = 4;
ninjaclass.skill['Sleight of Hand'][3] = 1;
ninjaclass.skill['Stealth'][3] = 10;
ninjaclass.skill['Swim'][3] = 5;
ninjaclass.skill['Use Magic Device'][3] = 5;

ninjaclass.skill['Disguise'][4] = 3;
ninjaclass.skill['Disable Device'][5].push(["light dim less",5]);
ninjaclass.skill['Perception'][5].push(["light dim less",5]);
ninjarace.skill['Stealth'][5].push(["opposed",3]);
characters[ninja].stats.push(["Ninja",ninjaclass,"Class"]);
ninjaclass.mod="CHA";

//ninjaclass.Spells.push(find_Castable("Magic Missile"));

//items
characters[ninja].stats.push(["Belt of Incredible Dexterity",new Stats(0,2,0,0,0,0),"Item"]);
characters[ninja].stats.push(["Headband of Charisma",new Stats(0,0,0,0,0,2),"Item"]);
var ninjaclass = new Stats(0,0,0,0,0,0);
ninjaclass.saves['fortitude'].Misc = 2;
ninjaclass.saves['reflex'].Misc = 2;
ninjaclass.saves['will'].Misc = 2;
characters[ninja].stats.push(["Cloak of resistance",ninjaclass,"Item"]);
var ninjaclass = new Stats(0,0,0,0,0,0);
ninjaclass.skill['Perception'][4] = 5;
characters[ninja].stats.push(["Eyes of the Eagle",ninjaclass,"Item"]);
var ninjaclass = new Stats(0,0,0,0,0,0);
ninjaclass.skill['Disable Device'][4] = 2;
characters[ninja].stats.push(["Masterwork Theives Tools",ninjaclass,"Item"]);
var ninjaclass = new Stats(0,0,0,0,0,0);
ninjaclass.armour['armour'] = 4;
ninjaclass.resistance['damage'] = 5;
ninjaclass.skill['Stealth'][4] = 5;
characters[ninja].stats.push(["Armour",ninjaclass,"Armour"]);
applyFeat("Skill Focus (Stealth)",characters[ninja]);
applyFeat("Weapon Finesse",characters[ninja]);

characters[ninja].stats.push(["Fatal Finesse",new Stats(0,0,0,0,0,0),"Ninja Trick"]);

var weap = new Weapon("+1 Keen Corrosive Chthonic Wakizashi", "L", "Exotic", "Melee", [1,6], "P/S", [15,2], " - ", " - ", 10, cMoney(17285,"cp"),1,[[1,6,"acid"]],2);
characters[ninja].Equip(weap);
var weap = new Weapon("+1 Cold Iron Shuriken", 1, "Exotic", "Thrown", [1,2], "P", [20,2], 10, 100, 0.5, cMoney(640,"cp"),"Masterwork",[[3,6,"P"]]);
characters[ninja].Equip(weap);
}