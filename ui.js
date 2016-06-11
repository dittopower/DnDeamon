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
	tabs_main.append("<div class='name'>Name: "+ characters[current].Name +"</div>");
	tabs_main.append("<div class='alignment'>Alignment: "+ characters[current].Alignment +"</div>");
	tabs_main.append("<div class='player'>Player: "+ characters[current].Player +"</div>");
	tabs_main.append("<div class='race'>Race: "+ characters[current].Race +"</div>");
	tabs_main.append("<div class='class'>Class: "+ characters[current].Class +"</div>");
	tabs_main.append("<div class='level'>Level: "+ characters[current].Level +"</div>");
	tabs_main.append("<div class='deity'>Deity: "+ characters[current].Deity +"</div>");
	tabs_main.append("<div class='homeland'>Homeland: "+ characters[current].Homeland +"</div>");
	tabs_main.append("<div class='gender'>Gender: "+ characters[current].Gender +"</div>");
	tabs_main.append("<div class='height'>Height: "+ characters[current].Height +"</div>");
	tabs_main.append("<div class='weight'>Weight: "+ characters[current].Weight +"</div>");
	tabs_main.append("<div class='hair'>Hair: "+ characters[current].Hair +"</div>");
	tabs_main.append("<div class='eye'>Eye: "+ characters[current].Eye +"</div>");

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
	tabs_rolls.append("<h1>Combat & Defence</h1>");
	tabs_rolls.append("<div class='ac'>AC: "+ characters[current].ac() +" Flat: "+ characters[current].ac(true) +"</div>");
	tabs_rolls.append("<div class='actouch'>AC Touch: "+ characters[current].ac_touch() +" Flat: "+ characters[current].ac_touch(true) +"</div>");
	
	tabs_rolls.append("<div class='fort'>Fortitude: "+ characters[current].save_fort() +"</div>");
	tabs_rolls.append("<div class='refl'>Reflex: "+ characters[current].save_refl() +"</div>");
	tabs_rolls.append("<div class='will'>Will: "+ characters[current].save_will() +"</div>");
	
	tabs_rolls.append("<div class='bab'>Attack Bonus: "+ characters[current].BAB() +"</div>");
	tabs_rolls.append("<div class='cmb'>CMB: "+ characters[current].CMB() +"</div>");
	tabs_rolls.append("<div class='cmd'>CMD: "+ characters[current].CMD() +"</div>");
	
	tabs_rolls.append("<hr><h2>Offence</h2>");
	tabs_rolls.append("<button onclick='roll_CMB()'>CMB - Combat Maneuver</button>");
	tabs_rolls.append("<button onclick='roll_CMD()'>CMD - Combat Defence Maneuver</button>");
	tabs_rolls.append("<hr><h2>Defence</h2>");
	tabs_rolls.append("<button onclick='roll_save(\"fort\")'>Fortitude</button>");
	tabs_rolls.append("<button onclick='roll_save(\"refl\")'>Reflex</button>");
	tabs_rolls.append("<button onclick='roll_save(\"will\")'>Will</button>");
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
	audio = new Audio();
	tick = setInterval(function(){upkeep();}, 10000);
}




