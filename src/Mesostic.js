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

Mesostic.prototype.getWord = function(letter){
	var patternStr = new RegExp('[a-z]*'+letter+'[a-z]*','i');
	for (var i=0; i<textArr.length; i++){
		if (patternStr.test(textArr[i])){
				return textArr[i];
			}
		else{
			continue;
		} 
	}
};

Mesostic.prototype.getPureWord = function(letter){
	var regexCheckFor1 = new RegExp('([a-z]*'+letter+'[a-z]*){1}','i'); // [a-rt-z]*s{1}[a-rt-z]*
	var regexCheckFor2plus = new RegExp('([a-z]*'+letter+'[a-z]*){2}','i'); // [a-rt-z]*s{2}[a-rt-z]*
	
	for (var i=0; i<textArr.length; i++){
		if (regexCheckFor1.test(textArr[i]) && !regexCheckFor2plus.test(textArr[i])){				
				this.index = i+1;
				return textArr[i];
			}
		else{
			continue;
		} 
	}

};

Mesostic.prototype.getIndex = function(){
	return this.index;
};

window.Mesostic = Mesostic;