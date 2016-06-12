var menublock = $("<div id='menu' class='sections'>");
var logblock = $("<div id='log' class='sections'>");
var textblock = $("<div id='rolls'>");
var mainblock = $("<div id='main' class='sections'>");

var statblock = $("<div id='stat' class='mstats'>");
var tabs_rolls = $("<div id='controls-rolls' class='stat mrolls'>");
var tabs_main = $("<div id='controls-main' class='stat mmain'>");
var tabs_chars = $("<div id='controls-char' class='stat mchars'>");

var disChars = $("<select id=charsel>");
var audio;

characters = new Array();
current = "Default";
characters[current] = new Character(current,'D_player',1,'Human','Fighter','N',10,10,10,10,10,10,"None","Australia",'Male',5.7,90,Sizes[4],'blond','green');

function mytabs(){
	disChars.appendTo(document.body);
	menublock.appendTo(document.body);
	mainblock.appendTo(document.body);
	logblock.appendTo(document.body);
	
//Menu
	menublock.append("<h1>Menu</h1>");
	menublock.append("<h4 class='mmain' onclick=\"reveal('main')\">Character Info</h4>");
	menublock.append("<h4 class='mstats' onclick=\"reveal('stats')\">Abilities & Skills</h4>");
	menublock.append("<h4 class='mrolls' onclick=\"reveal('rolls')\">Combat & Defence</h4>");
	menublock.append("<h4 class='mchars' onclick=\"reveal('chars')\">Characters</h4>");
	
	disChars[0].onchange = function(eve){current=eve.target.value; displayStats();}
	
//Main Tab
	tabs_main.hide();
	mainblock.append(tabs_main);
	
//Rolls Tab - Combat & Defence Tab
	tabs_rolls.hide();
	mainblock.append(tabs_rolls);
	
//Characters Tab
	tabs_chars.hide();
	tabs_chars.append("<hr><h2>Create a Character (CS)</h2>");
	tabs_chars.append("<hr><h2>Level Up(CS)</h2>");
	mainblock.append(tabs_chars);

//Stats Tab
	statblock.hide();
	mainblock.append(statblock);

//Log
	logblock.append("<h1>Log</h1>");
	logblock.append(textblock);
	reveal();
	upkeep();
}

function charsUpdate(){
	disChars.empty();
	for(var ib in characters){
		if(ib == current){
			disChars.append("<option value='"+ib+"' selected>"+ib+"</option>");
		}else{
			disChars.append("<option value='"+ib+"'>"+ib+"</option>");
		}
	}
}

function reveal(data){
	mainblock.children().hide();
	mainblock.removeClass();
	mainblock.addClass("sections");
	switch(data){
		case 'rolls':
			tabs_rolls.show();
			break;
		case 'stats':
			statblock.show();
			break;
		case 'chars':
			tabs_chars.show();
			break;
		default:
			tabs_main.show();
			data = 'main';
	}
	mainblock.addClass("m"+data)
}

function displayStats(){
	statblock.empty();
	tabs_main.empty();
	tabs_rolls.empty();
	var disTemp;

//basic
	tabs_main.append("<h1>Character Info</h1>");
	tabs_main.append("<div class='name statdiv'>Name: "+ characters[current].Name +"</div>");
	tabs_main.append("<div class='alignment statdiv'>Alignment: "+ characters[current].Alignment +"</div>");
	tabs_main.append("<div class='player statdiv'>Player: "+ characters[current].Player +"</div>");
	tabs_main.append("<div class='race statdiv'>Race: "+ characters[current].Race +"</div>");
	tabs_main.append("<div class='class statdiv'>Class: "+ characters[current].Class +"</div>");
	tabs_main.append("<div class='level statdiv'>Level: "+ characters[current].Level +"</div>");
	tabs_main.append("<div class='deity statdiv'>Deity: "+ characters[current].Deity +"</div>");
	tabs_main.append("<div class='homeland statdiv'>Homeland: "+ characters[current].Homeland +"</div>");
	tabs_main.append("<div class='gender statdiv'>Gender: "+ characters[current].Gender +"</div>");
	tabs_main.append("<div class='height statdiv'>Height: "+ characters[current].Height +"</div>");
	tabs_main.append("<div class='weight statdiv'>Weight: "+ characters[current].Weight +"</div>");
	tabs_main.append("<div class='hair statdiv'>Hair: "+ characters[current].Hair +"</div>");
	tabs_main.append("<div class='eye statdiv'>Eye: "+ characters[current].Eye +"</div>");

	statblock.append("<h1>Abilities & Skills</h1>");
//abilitys
	disTemp = $("<table class='abilities'><tr><th><div class='rollableIcon'>x</div></th><th>Ability</th><th>Score</th><th>Mod</th></tr></table>");
	for(ib = 0; ib < Abilities.length;ib++){
		disTempRow = $("<tr>");
		disTempRow.append("<td><div class='rollable' onclick='roll_abl(\""+Abilities[ib]+"\")'>x</div></td>");
		disTempRow.append("<td>"+Abilities[ib]+"</td>");
		disTempRow.append("<td>"+characters[current].ability_score(Abilities[ib])+"</td>");
		disTempRow.append("<td>"+characters[current].ability_mod(Abilities[ib])+"</td>");
		disTemp.append(disTempRow);
	}
	statblock.append(disTemp);
//skills
	disTemp = $("<table class='skills'><tr><th><div class='rollableIcon'>x</div></th><th>*</th><th>Skills</th><th>Total</th><th>Mod</th><th>Ranks</th><th>Misc</th></tr></table>");
	for(ib = 0; ib < Skills.length;ib++){
		disTempRow = $("<tr>");
		var trained = false;
		var clas = false;
		var ranks = 0;
		var bonus = 0;
		for(ic = 0; ic < characters[current].stats.length; ic++){
			trained = trained || characters[current].stats[ic][1].skill[Skills[ib]][0];
			clas = clas || characters[current].stats[ic][1].skill[Skills[ib]][1];
			ranks = characters[current].stats[ic][1].skill[Skills[ib]][3];
			bonus = characters[current].stats[ic][1].skill[Skills[ib]][4];
		}
		disTempRow.append("<td><div class='rollable' onclick='roll_skl(\""+Skills[ib]+"\")'>x</div></td>");
		if(clas){
			disTempRow.append("<td>X</td>");
		}else{
			disTempRow.append("<td></td>");
		}
		disTempRow.append("<td>"+Skills[ib]+"</td>");
		disTempRow.append("<td>"+characters[current].skill_score(Skills[ib])+"</td>");
		disTempRow.append("<td>"+characters[current].stats[0][1].skill[Skills[ib]][2]+"</td>");
		disTempRow.append("<td>"+ranks+"</td>");
		disTempRow.append("<td>"+bonus+"</td>");
		if(!trained || clas){
			disTemp.append(disTempRow);
		}
	}
	statblock.append(disTemp);
	
//combat
	tabs_rolls.append("<h1>Defence</h1>");
	tabs_rolls.append("<div class='ac statdiv'>AC: "+ characters[current].ac() +" Flat: "+ characters[current].ac(true) +"</div>");
	tabs_rolls.append("<div class='actouch statdiv'>AC Touch: "+ characters[current].ac_touch() +" Flat: "+ characters[current].ac_touch(true) +"</div>");
	tabs_rolls.append("<div class='sr statdiv'>Spell Resistance: "+ characters[current].sr() +"</div>");
	tabs_rolls.append("<div class='concentration statdiv'>Concentration: "+ characters[current].concentration() +"</div>");
	
	var disTempRow = $("<table class='resistances'><tr><th>Resistance</th><th>Total</th></tr></table>");
	for(var i = 0;i< EnergyTypes.length; i++){
		disTempRow.append("<tr><td>"+ EnergyTypes[i] + "</td><td>" + characters[current].resistance(EnergyTypes[i]) +"</td></tr>");
	}
	tabs_rolls.append(disTempRow);
	
	var disTempRow = $("<table class='saves'><tr><th><div class='rollableIcon'>x</div></th><th>Save</th><th>Total</th></tr></table>");
	disTempRow.append("<tr><td><div class='rollable' onclick='roll_save(\"fort\")'>x</div></td><td>Fortitude</td><td>" + characters[current].save_fort() +"</td></tr>");
	disTempRow.append("<tr><td><div class='rollable' onclick='roll_save(\"refl\")'>x</div></td><td>Reflex</td><td>" + characters[current].save_refl() +"</td></tr>");
	disTempRow.append("<tr><td><div class='rollable' onclick='roll_save(\"will\")'>x</div></td><td>Will</td><td>" + characters[current].save_will() +"</td></tr>");
	tabs_rolls.append(disTempRow);

	
	tabs_rolls.append("<hr><h1>Combat</h1>");
	tabs_rolls.append("<div class='bab statdiv'>Attack Bonus: "+ characters[current].BAB().toString() +"</div>");
	tabs_rolls.append("<div class='cmb statdiv'>CMB: "+ characters[current].CMB() +" <div class='rollable' onclick='roll_CMB()'>x</div></div>");
	tabs_rolls.append("<div class='cmd statdiv'>CMD: "+ characters[current].CMD() +" <div class='rollable' onclick='roll_CMD()'>x</div></div>");
	
	var disTempRow = $("<table class='Attacks'><tr><th>Attack</th><th>ATK Bonus</th><th>Critical</th><th>Type</th><th>Damage</th><th>Range</th><th>Ammunition</th></tr></table>");
	disTempRow.append("<tr><td>Melee</td><td><div class='rollable' onclick='roll_atk_melee()'>x</div>+"+atk_abl("Melee")+"</td><td>20</td><td> - </td><td> - </td><td> - </td><td> - </td></tr>");
	disTempRow.append("<tr><td>Ranged</td><td><div class='rollable' onclick='roll_atk_range()'>x</div>+"+atk_abl("Ranged")+"</td><td>20</td><td> - </td><td> - </td><td> - </td><td> - </td></tr>");
	disTempRow.append("<tr><td>Melee Touch</td><td><div class='rollable' onclick='roll_atk_touch()'>x</div>+"+atk_abl("melee")+"</td><td>20</td><td> - </td><td> - </td><td> - </td><td> - </td></tr>");
	disTempRow.append("<tr><td>Ranged Touch</td><td><div class='rollable' onclick='roll_atk_Rtouch()'>x</div>+"+atk_abl("ranged")+"</td><td>20</td><td> - </td><td> - </td><td> - </td><td> - </td></tr>");
	for(var i = 0; i < characters[current].weapons.length;i++){
		disTempRow.append("<tr><td>"+characters[current].weapons[i].Name+"</td><td><div class='rollable' onclick='roll_Watk("+i+")'>x</div>+"+atk_abl(characters[current].weapons[i].Use)+"</td><td>"+characters[current].weapons[i].Crit[0]+"-20, x"+characters[current].weapons[i].Crit[1]+"</td><td>"+characters[current].weapons[i].Type+"</td><td><div class='rollable' onclick='roll_Wdmg("+i+")'>x</div>"+characters[current].weapons[i].DMG.toString().replace(",","d")+"</td><td>"+characters[current].weapons[i].Range+"</td><td>"+characters[current].weapons[i].Ammo+"</td></tr>");
	}
	tabs_rolls.append(disTempRow);
	
	if(statblock.height() > (window.innerHeight-disChars[0].clientHeight *2.5)){
		statblock.append("<span class='spacer'>");
	}
	if(tabs_rolls.height() > (window.innerHeight-disChars[0].clientHeight *2.5)){
		tabs_rolls.append("<span class='spacer'>");
	}
	if(tabs_main.height() > (window.innerHeight-disChars[0].clientHeight *2.5)){
		tabs_main.append("<span class='spacer'>");
	}
	if(tabs_chars.height() > (window.innerHeight-disChars[0].clientHeight *2.5)){
		tabs_chars.append("<span class='spacer'>");
	}
}

function chat_msg(msg,clas){
	if(clas == undefined){
		clas = "";
	}
	textblock.append("<div class='msg "+clas+"'>"+msg+"</div>");
	textblock.scrollTop(textblock[0].scrollHeight);
}

function sound_play(sound){
	audio.src = sound;
	audio.play();
}

function upkeep(){
	displayStats();
	var il = 0; var data;
	for(data in characters){il++;}
	if(disChars.children().length != il){
		charsUpdate();
	}
}

onload = function(){
	mytabs();
	resise();
	audio = new Audio();
	tick = setInterval(function(){upkeep();}, 10000);
}

window.onresize = function(){resise();}

function resise(){
	mainblock.height((window.innerHeight-disChars[0].clientHeight *1.5));
}
