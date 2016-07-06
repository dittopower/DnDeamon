//character creator
var char_creator = $("<div id=Char_creator class='mcharcreator'>");
var chars_races = $("<table id=races>");
var chars_classes = $("<table id=classes>");
var chars_stats = $("<div id=basestats>");
var chars_racech = $("<div id=racech>");
var chars_classch = $("<div id=classch>");
var chars_skill = $("<div id=skillranks>");
var chars_feats = $("<div id=sfeats>");
var chars_traits = $("<div id=straits>");
var chars_other = $("<div id=ccother>");//languages, etc
var chars_items = $("<div id=sitems>");
var chars_title = $("<h2 id=StageTitle>");
var chars_des = $("<p id=StageDes>");
var stage = 0;

var char_creator = $("<div id=Char_creator class='mcharcreator'>");
var cNext = $("<div class='clickable' onclick='nextStage()'>Next</div>");
var cPrevious = $("<div class='clickable' onclick='prevStage()'>Previous</div>");

var progress;


//char_creator.append("<h1>Character Creator</h1>");
var StageControls = $("<div id=controls class='mcharcreator'>");
StageControls.append(chars_title);
StageControls.append(chars_des);
StageControls.append(cPrevious);
StageControls.append(cNext);
StageControls.append("<hr>");
char_creator.append(StageControls);
var StageBreak = $("<div>");
char_creator.append(StageBreak);

chars_stats.append("<label for='pcname'>Name: </label><input type=text id=pcname class=ccname value='Wander' placeholder='Character Name'><br>");
chars_stats.append("<label for='playername'>Player: </label><input type=text id=playername class=ccplayer value='you' placeholder='Your Name'><br>");
var ccpoint = [20,0];
var ccstats = [10,10,10,10,10,10];
var statbuy = $("<label for='buying'>Buy Points: <b>0</b></label>");
chars_stats.append(statbuy);
chars_stats.append(" / <input type=number id=buying class=buypoint value="+ccpoint[0]+" max=25 min=10 step=5 onchange='updateBuy(this.value)'><br>");

var buyStatTable = $('<table>');
buyStatTable.append("<tr><td><label for=ccstr>Strength: </label></td><td><input type=number id=ccstr class=ccpoint value=10 max=18 min=7 onchange='ccPoints(\"0\")'></td></tr>");
buyStatTable.append("<tr><td><label for=ccdex>Dexterity: </label></td><td><input type=number id=ccdex class=ccpoint value=10 max=18 min=7 onchange='ccPoints(\"1\")'></td></tr>");
buyStatTable.append("<tr><td><label for=cccon>Constitution: </label></td><td><input type=number id=cccon class=ccpoint value=10 max=18 min=7 onchange='ccPoints(\"2\")'></td></tr>");
buyStatTable.append("<tr><td><label for=ccint>Intelligence: </label></td><td><input type=number id=ccint class=ccpoint value=10 max=18 min=7 onchange='ccPoints(\"3\")'></td></tr>");
buyStatTable.append("<tr><td><label for=ccwis>Wisdom: </label></td><td><input type=number id=ccwis class=ccpoint value=10 max=18 min=7 onchange='ccPoints(\"4\")'></td></tr>");
buyStatTable.append("<tr><td><label for=cccha>Charisma: </label></td><td><input type=number id=cccha class=ccpoint value=10 max=18 min=7 onchange='ccPoints(\"5\")'></td></tr>");
chars_stats.append(buyStatTable);

function ccPoints (evt){
	ccpoint[1] = 0;
	var temp = $('.ccpoint');
	for(var i = 0; i < temp.length; i++){
		ccstats[i] = Number(temp[i].value);
		switch(ccstats[i]){
			case 7:
				ccpoint[1] += -4;
				break;
			case 8:
				ccpoint[1] += -2;
				break;
			case 9:
				ccpoint[1] += -1;
				break;
			case 10:
				ccpoint[1] += 0;
				break;
			case 11:
				ccpoint[1] += 1;
				break;
			case 12:
				ccpoint[1] += 2;
				break;
			case 13:
				ccpoint[1] += 3;
				break;
			case 14:
				ccpoint[1] += 5;
				break;
			case 15:
				ccpoint[1] += 7;
				break;
			case 16:
				ccpoint[1] += 10;
				break;
			case 17:
				ccpoint[1] += 13;
				break;
			case 18:
				ccpoint[1] += 17;
				break;
		}
	}
	if(ccpoint[0] == ccpoint[1]){
		eNext();
		statbuy[0].innerHTML ="Buy Points: <b>"+ccpoint[1]+"</b>";
	}else if(ccpoint[0] < ccpoint[1]){
		dNext()
		statbuy[0].innerHTML ="Buy Points: <b style='color:red;'>"+ccpoint[1]+"</b>";
	}else{
		dNext();
		statbuy[0].innerHTML ="Buy Points: <b>"+ccpoint[1]+"</b>";
	}
}
function updateBuy(i){
	i = Number(i);
	ccpoint[0]= i;
	ccPoints();
}

function dNext(){
	cNext[0].onclick = "";
	cNext.addClass("disabled");
	if(dev){
		eNext();
	}
}

function eNext(){
	cNext[0].onclick = function(){nextStage()};
	cNext.removeClass("disabled");
}

char_creator.append(chars_races);
char_creator.append(chars_classes);
char_creator.append(chars_stats);


race_list();
//class_list();

function nextStage(ink){
	if(ink == undefined){
		ink = 1;
	}
	switch(stage){
		case 1:
			chars_stats.slideUp();
			cc_setAbility();
			break;
		case 2:
			chars_races.slideUp();
			cc_setRace();
			break;
		case 3:
			break;
		case 4:
			chars_classes.slideUp();
			cc_setClass();
			break;
		case 5:
			break;
		case 6:
			break;
		case 7:
			break;
		case 8:
			break;
		case 9:
			break;
	}
	stage += ink;
	cPrevious.show();
	if(stage == 1){
		cPrevious.hide();
	}
	if(cNext.text() != "Next"){
		cNext.text("Next");
	}
	dNext();
	switch(stage){
		case 1:
			chars_des.text("Time to make a Character! Don't worry, you can come back and change any choice you make until you click \"Done\" on the final page. \n Start by naming your character and selecting your ability scores.");
			chars_stats.slideDown();
			chars_title.text("Stage "+stage+": Ability Scores");//add gender here
			break;
		case 2:
			chars_des.text("Now select your race.");
			chars_races.slideDown();
			chars_title.text("Stage "+stage+": Select Race");
			break;
		case 3:
			chars_des.text("Do you want to you the basic race or some of the alternate traits?");
			chars_title.text("Stage "+stage+": Race Choices");
			break;
		case 4:
			chars_des.text("What class or classes is the character? Enter your starting level and then distribute levels to your desired classes.");
			chars_classes.slideDown();
			chars_title.text("Stage "+stage+": Select Class");
			break;
		case 5:
			chars_des.text("Make any choices associated with your class/es.");
			chars_title.text("Stage "+stage+": Class Choices");
			break;
		case 6:
			chars_des.text("Assign your skill ranks.");
			chars_title.text("Stage "+stage+": Allocate Skill Ranks");
			break;
		case 7:
			chars_des.text("Choose feats to enhance your character.");
			chars_title.text("Stage "+stage+": Select Feats");
			break;
		case 8:
			chars_des.text("If you don't what traits are you don't need them. Also, check with your GM if background trait are allowed in their game.");
			chars_title.text("Stage "+stage+": Background|Traits");
			break;
		case 9:
			chars_des.text("Choice progression rate(ask your GM), bonus languages and other little bits.");
			chars_title.text("Stage "+stage+": Other");
			break;
		case 10:
			chars_des.text("Spend your gold to equip your character.");
			chars_title.text("Stage "+stage+": Buy Items");
			break;
		case 0:
			//create char & set as current
			characters[progress.Name] = progress;
			current = progress.Name;
			reveal('chars');
		default:
			chars_title.text("Confirm Character?");
			cNext.text("Done");
			stage = -1;
			break;
	}
	StageBreak.height(StageControls.height());
}

function prevStage(){
	nextStage(-1)
}

function resetStage(){
	stage = 0;
	progress = new Character('Name','Player');
	chars_races.hide();
	chars_classes.hide();
	chars_stats.hide();
	nextStage();
	var temp = $('.ccpoint');
	for(var i = 0; i < temp.length; i++){
		temp[i].value = 10;
	}
	$('#pcname').val("Wander");
	$('#playername').val("You");
	ccPoints();
}

function cc_setAbility(){
	progress.Name = $('#pcname').val();
	progress.Player = $('#playername').val();
	progress.stats[0][1].ability['STR'][0] = ccstats[0];
	progress.stats[0][1].ability['DEX'][0] = ccstats[1];
	progress.stats[0][1].ability['CON'][0] = ccstats[2];
	progress.stats[0][1].ability['INT'][0] = ccstats[3];
	progress.stats[0][1].ability['WIS'][0] = ccstats[4];
	progress.stats[0][1].ability['CHA'][0] = ccstats[5];
}

function cc_setRace(){
	var race = $('input:radio[name=race_sel]:checked').val();
	progress.Race = race;
	firebase.database().ref('/Race/'+race).once('value').then(function(snapshot) {
		var Race = snapshot.val();
		var Temp = new Stats();
		progress.Type = Race.Type;
		progress.Subtype = Race.Subtype;
		
		for(var things in Race.Stats){
			Temp.ability[things][0] = Race.Stats[things];
		}
		progress.stats.push([snapshot.ref.path.o[snapshot.ref.path.o.length-1],Temp,"Race"]);
	});
}

function cc_setClass(){
	progress.Class.push(["Ninja",10]);
	var Temp = new Stats();
	Temp.level = 10;
	Temp.bab[0] = 7;
	Temp.bab[1] = 2;
	Temp.saves['fortitude'].Base = 3;
	Temp.saves['reflex'].Base = 7;
	Temp.saves['will'].Base = 3;
	Temp.skill['Acrobatics'][1] = true;
	Temp.skill['Appraise'][1] = true;
	Temp.skill['Bluff'][1] = true;
	Temp.skill['Climb'][1] = true;
	Temp.skill['Craft'][1] = true;
	Temp.skill['Diplomacy'][1] = true;
	Temp.skill['Disable Device'][1] = true;
	Temp.skill['Disguise'][1] = true;
	Temp.skill['Escape Artist'][1] = true;
	Temp.skill['Intimidate'][1] = true;
	Temp.skill['Knowledge Local'][1] = true;
	Temp.skill['Knowledge Nobility'][1] = true;
	Temp.skill['Linguistics'][1] = true;
	Temp.skill['Perception'][1] = true;
	Temp.skill['Perform'][1] = true;
	Temp.skill['Profession'][1] = true;
	Temp.skill['Sense Motive'][1] = true;
	Temp.skill['Sleight of Hand'][1] = true;
	Temp.skill['Stealth'][1] = true;
	Temp.skill['Swim'][1] = true;
	Temp.skill['Use Magic Device'][1] = true;

	Temp.skill['Disguise'][4] = 3;
	Temp.skill['Disable Device'][5].push(["light dim less",5]);
	Temp.skill['Perception'][5].push(["light dim less",5]);
	ninjarace.skill['Stealth'][5].push(["opposed",3]);
	Temp.mod = "CHA";
	progress.stats.push(["Ninja",Temp,"Class"]);
}