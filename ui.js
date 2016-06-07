statblock = $("#stat");
logblock = $("#log");
textblock = $("<div id='rolls'>");
mainblock = $("#main");
var audio;

characters = new Array();
current = "Default";
characters[current] = new Character(current,'D_player',1,'Human','Fighter','N',10,10,10,10,10,10,"None","Australia",'Male',5.7,90,Sizes[4],'blond','green');

function mytabs(){
	var tabs = $("<div id='controls'>");
	var tabui = $("<ul>");
	tabs.append(tabui);
	tabui.append("<li><a href='#controls-main'>Main</a></li>");
	tabui.append("<li><a href='#controls-rolls'>Rolls</a></li>");
	tabui.append("<li><a href='#controls-char' onclick=\"charsUpdate()\">Characters</a></li>");
	tabs.append("<hr>");
	
	//Main Tab
	var tabs_cont = $("<div id='controls-main'>stuff</div>");
	tabs.append(tabs_cont);
	
	//Rolls Tabs
	tabs_cont = $("<div id='controls-rolls'>");
	tabs_cont.append("<h2>Abilities</h2>");
	for(ib = 0; ib < Abilities.length;ib++){
		tabs_cont.append("<button onclick='roll_abl(\""+Abilities[ib]+"\")'>"+Abilities[ib]+"</button>");
	}
	tabs_cont.append("<hr><h2>Skills</h2>");
	for(ib = 0; ib < Skills.length;ib++){
		tabs_cont.append("<button onclick='roll_skl(\""+Skills[ib]+"\")'>"+Skills[ib]+"</button>");
	}
	tabs_cont.append("<hr><h2>Offence</h2>");
	tabs_cont.append("<button onclick='roll_CMB()'>CMB - Combat Maneuver</button>");
	tabs_cont.append("<button onclick='roll_CMD()'>CMD - Combat Defence Maneuver</button>");
	tabs_cont.append("<hr><h2>Defence</h2>");
	tabs_cont.append("<button onclick='roll_save(\"fort\")'>Fortitude</button>");
	tabs_cont.append("<button onclick='roll_save(\"refl\")'>Reflex</button>");
	tabs_cont.append("<button onclick='roll_save(\"will\")'>Will</button>");
	tabs.append(tabs_cont);
	
	//Characters Tab
	tabs_cont = $("<div id='controls-char'>");
	disChars = $("<select>");
	disChars[0].onchange = function(eve){current=eve.target.value; displayStats();}
	var disTemp = $("<h2>Select a Character:</h2>");
	disTemp.append(disChars);
	tabs_cont.append(disTemp);
	tabs_cont.append("<hr><h2>Create a Character (CS)</h2>");
	tabs_cont.append("<hr><h2>Level Up(CS)</h2>");
	tabs.append(tabs_cont);
	
	mainblock.append(tabs);
	$(function() {
		$( "#controls" ).tabs();
	  });
	  
	logblock.append("<h1>Log</h1>");
	logblock.append(textblock);
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

function displayStats(){
	statblock.empty();
	var disTemp;
	statblock.append("<div class='name'>Name: "+ characters[current].Name +"</div>");
	statblock.append("<div class='alignment'>Alignment: "+ characters[current].Alignment +"</div>");
	statblock.append("<div class='player'>Player: "+ characters[current].Player +"</div>");
	statblock.append("<div class='race'>Race: "+ characters[current].Race +"</div>");
	statblock.append("<div class='class'>Class: "+ characters[current].Class +"</div>");
	statblock.append("<div class='level'>Level: "+ characters[current].Level +"</div>");
	statblock.append("<div class='deity'>Deity: "+ characters[current].Deity +"</div>");
	statblock.append("<div class='homeland'>Homeland: "+ characters[current].Homeland +"</div>");
	statblock.append("<div class='gender'>Gender: "+ characters[current].Gender +"</div>");
	statblock.append("<div class='height'>Height: "+ characters[current].Height +"</div>");
	statblock.append("<div class='weight'>Weight: "+ characters[current].Weight +"</div>");
	statblock.append("<div class='hair'>Hair: "+ characters[current].Hair +"</div>");
	statblock.append("<div class='eye'>Eye: "+ characters[current].Eye +"</div>");
	//abilitys
	disTemp = $("<table class='abilities'><tr><th>Ability</th><th>Score</th><th>Mod</th></tr></table>");
	for(ib = 0; ib < Abilities.length;ib++){
		disTempRow = $("<tr>");
		disTempRow.append("<td>"+Abilities[ib]+"</td>");
		disTempRow.append("<td>"+characters[current].ability_score(Abilities[ib])+"</td>");
		disTempRow.append("<td>"+characters[current].ability_mod(Abilities[ib])+"</td>");
		disTemp.append(disTempRow);
	}
	statblock.append(disTemp);
	//skills
	disTemp = $("<table class='skills'><tr><th>*</th><th>Skills</th><th>Total</th><th>Mod</th><th>Ranks</th><th>Misc</th></tr></table>");
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
	
	statblock.append("<div class='ac'>AC: "+ characters[current].ac() +" Flat: "+ characters[current].ac(true) +"</div>");
	statblock.append("<div class='actouch'>AC Touch: "+ characters[current].ac_touch() +" Flat: "+ characters[current].ac_touch(true) +"</div>");
	
	statblock.append("<div class='fort'>Fortitude: "+ characters[current].save_fort() +"</div>");
	statblock.append("<div class='refl'>Reflex: "+ characters[current].save_refl() +"</div>");
	statblock.append("<div class='will'>Will: "+ characters[current].save_will() +"</div>");
	
	statblock.append("<div class='bab'>Attack Bonus: "+ characters[current].BAB() +"</div>");
	statblock.append("<div class='cmb'>CMB: "+ characters[current].CMB() +"</div>");
	statblock.append("<div class='cmd'>CMD: "+ characters[current].CMD() +"</div>");
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

onload = function(){
	statblock = $("#stat");
	logblock = $("#log");
	textblock = $("<div id='rolls'>");
	mainblock = $("#main");
	mytabs();
	audio = new Audio();
	tick = setInterval(function(){displayStats();}, 1000);
}