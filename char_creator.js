//character creator
var char_creator = $("<div id=Char_creator class='mcharcreator'>");
var chars_races = $("<table id=races>");
var chars_classes = $("<table id=classes>");
var chars_stats = $("<div id=basestats>");
var chars_title = $("<h2 id=StageTitle>");
var stage = 0;

var char_creator = $("<div id=Char_creator class='mcharcreator'>");
var cNext = $("<div class='clickable' onclick='nextStage()'>Next</div>");
var cPrevious = $("<div class='clickable' onclick='prevStage()'>Previous</div>");


char_creator.append("<h1>Character Creator</h1>");
char_creator.append(chars_title);
//chars_title.hide();
char_creator.append(chars_races);
char_creator.append(chars_classes);
char_creator.append(chars_stats);
char_creator.append(cPrevious);
char_creator.append(cNext);

race_list();
//class_list();
char_creator.append("<hr>");

function nextStage(ink){
	if(ink == undefined){
		ink = 1;
	}
	switch(stage){
		case 1:
			chars_races.slideUp();
			break;
		case 2:
			chars_classes.slideUp();
			break;
		case 3:
			chars_stats.slideUp();
			break;
	}
	stage += ink;
	cPrevious.show();
	switch(stage){
		case 1:
			chars_races.slideDown();
			cPrevious.hide();
			chars_title.text("Stage "+stage+": Select Race");
			break;
		case 2:
			chars_stats.slideDown();
			chars_title.text("Stage "+stage+": Ability Scores");
			break;
		case 3:
			chars_classes.slideDown();
			chars_title.text("Stage "+stage+": Select Class");
			break;
		default:
			chars_title.text("Error Invalid Stage:"+stage);
			break;
	}
}

function prevStage(){
	nextStage(-1)
}