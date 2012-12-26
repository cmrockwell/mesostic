/**
 * @author Chris
 */
var Mesostic = function() {
	var spineWord="";
	var seedText="";
	var poem="";
};

Mesostic.prototype.setSpine = function(sp) {
    spineWord = sp;
};
Mesostic.prototype.getSpine = function() {
    return spineWord;
};
Mesostic.prototype.setSeed = function(seed) {
    seedText = seed;
};
Mesostic.prototype.getSeed = function() {
    return seedText;
};



window.Mesostic = Mesostic;