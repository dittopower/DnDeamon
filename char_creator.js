//character creator
var char_creator = $("<div id=Char_creator class='mcharcreator'>");
var chars_races = $("<table id=races>");
var chars_classes = $("<table id=classes>");
var chars_stats = $("<div id=basestats>");
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
StageControls.append(cPrevious);
StageControls.append(cNext);
StageControls.append(chars_des);
StageControls.append("<hr>");
char_creator.append(StageControls);
var StageBreak = $("<div>");
char_creator.append(StageBreak);

char_creator.append(chars_races);
char_creator.append(chars_classes);
char_creator.append(chars_stats);


race_list();
//class_list();
chars_des.text("Time to make a Character! Don't worry, you can come back and change any choice you make until you click \"Done\".");

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
	switch(stage){
		case 1:
			chars_stats.slideDown();
			chars_title.text("Stage "+stage+": Ability Scores");
			break;
		case 2:
			chars_races.slideDown();
			chars_title.text("Stage "+stage+": Select Race");
			break;
		case 3:
			chars_title.text("Stage "+stage+": Race Choices");
			break;
		case 4:
			chars_classes.slideDown();
			chars_title.text("Stage "+stage+": Select Class");
			break;
		case 5:
			chars_title.text("Stage "+stage+": Class Choices");
			break;
		case 6:
			chars_title.text("Stage "+stage+": Allocate Skill Ranks");
			break;
		case 7:
			chars_title.text("Stage "+stage+": Select Feats");
			break;
		case 8:
			chars_title.text("Stage "+stage+": Languages");
			break;
		case 9:
			chars_title.text("Stage "+stage+": Languages");
			break;
		case 0:
			//create char & set as current
			characters[progress.Name] = progress;
			current = progress.Name;
			reveal('chars');
		default:
			chars_title.text("Confirm Character?");
			cNext.text("Done.");
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
}

function cc_setAbility(){
	progress.stats[0][1].ability['STR'][0] = 10;
	progress.stats[0][1].ability['DEX'][0] = 10;
	progress.stats[0][1].ability['CON'][0] = 10;
	progress.stats[0][1].ability['INT'][0] = 10;
	progress.stats[0][1].ability['WIS'][0] = 10;
	progress.stats[0][1].ability['CHA'][0] = 10;
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