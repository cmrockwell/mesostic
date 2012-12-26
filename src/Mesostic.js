/**
 * @author Chris
 */
var Mesostic = function() {
	var spineWord="";
	var seedText="";
	var poem="";
	var textArr=[];
};
Mesostic.prototype.init = function() {
	//var pattern = /[a-z-']+/i; // matches words with no digits
    //textArr = seedText.match(pattern);
};

Mesostic.prototype.setSpine = function(sp) {
    spineWord = sp;
};
Mesostic.prototype.getSpine = function() {
    return spineWord;
};
Mesostic.prototype.setSeed = function(seed) {
    seedText = seed;
    var pattern = /[a-z-']+/gi; // matches words with no digits
    textArr = seedText.match(pattern);
};
Mesostic.prototype.getSeed = function(ind) {
    return textArr[ind];
};

Mesostic.prototype.getWord = function(index){
	var letter = spineWord.substring(index, index+1);
};


window.Mesostic = Mesostic;