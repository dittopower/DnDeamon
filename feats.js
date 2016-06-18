
Feats = [];
Feats.push(["Skill Focus (Stealth)",function(data){
	var Temp = new Stats(0,0,0,0,0,0);
	Temp.skill['Stealth'][4] = 6;
	data.stats.push(["Skill Focus (Stealth)",Temp,"Feat"]);
	}]);
	
function applyFeat(feat,who){
	for(var i = 0; i < Feats.length;i++){
		if(feat == Feats[i][0]){
			Feats[i][1](who);
		}
	}
}