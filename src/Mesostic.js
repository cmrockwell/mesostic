/**
 * @author Chris
 */
var Mesostic = function() {
	var spineWord="";
	var seedText="";
	var poem="";
	this.textArr=[];
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
    this.textArr = seedText.match(pattern);
};

Mesostic.prototype.getSeed = function(ind) {
    return this.textArr[ind];
};

Mesostic.prototype.getWord = function(letter){
	var patternStr = new RegExp('[a-z]*'+letter+'[a-z]*','i');
	for (var i=0; i<this.textArr.length; i++){
		if (patternStr.test(this.textArr[i])){
				return this.textArr[i];
			}
		else{
			continue;
		} 
	}
};

Mesostic.prototype.getPureWord = function(letter){
	var regexCheckFor1 = new RegExp('([a-z]*'+letter+'[a-z]*){1}','i'); // [a-rt-z]*s{1}[a-rt-z]*
	var regexCheckFor2plus = new RegExp('([a-z]*'+letter+'[a-z]*){2}','i'); // [a-rt-z]*s{2}[a-rt-z]*
	
	for (var i=0; i<this.textArr.length; i++){
		if (regexCheckFor1.test(this.textArr[i]) && !regexCheckFor2plus.test(this.textArr[i])){				
				this.index = i+1;
				var foundWord = this.textArr[i];
				this.textArr = this.textArr.slice(this.index);
				return foundWord;
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