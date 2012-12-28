/**
 * @author Chris
 */
var Mesostic = function() {
	var spineWord="";
	var seedText="";
	this.poem=[];
	this.spineLtrs = [];
    this.maxIndexOfSpineLtr =0;
	this.textArr=[];
	this.index = 0; // refers to place in seed text
	this.spInd = -1; // refers to place in spine word
};

Mesostic.prototype.init = function(spine, seed) {
	this.setSpine(spine);
	this.setSeed(seed);
};

Mesostic.prototype.reset = function(){
	spineWord="";
	seedText="";
	this.poem=[];
	this.textArr=[];
	this.index = 0; // refers to place in seed text
	this.spInd = -1; // refers to place in spine word
	this.spineLtrs = [];
    this.maxIndexOfSpineLtr =0;	
}

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
	if (letter ===' '){	
		this.spineLtrs.push(0);	
		return letter;
	}
	var patternStr = new RegExp('[a-z]*'+letter+'[a-z]*','i');
	for (var i=0; i<this.textArr.length; i++){
		if (patternStr.test(this.textArr[i])){
				this.index = i+1;
				var foundWord = this.textArr[i].toLowerCase();
				letter = letter.toLowerCase();
				var ltrInd = foundWord.indexOf(letter);
				this.spineLtrs.push(ltrInd);	
				if(ltrInd > this.maxIndexOfSpineLtr){
					this.maxIndexOfSpineLtr = ltrInd;	
				}	
					
				var fw = foundWord.substring(0, ltrInd) + foundWord[ltrInd].toUpperCase() + foundWord.substring(ltrInd+1);
				this.textArr = this.textArr.slice(this.index);
				return fw;
			}
		else{
			continue;
		} 
	}
	return 0;// reached the end but there was no match
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
	return 0;// reached the end but there was no match
};

Mesostic.prototype.getIndex = function(){
	return this.index;
};

Mesostic.prototype.makeNonPure = function(){
	this.spInd++; 	
	var found= this.getWord(this.getSpine().charAt(this.spInd));
	if (found !==0){
		this.poem.push(found);	
		}
	if (this.poem.length < this.getSpine().length){
		this.makeNonPure();
	}
	else{ 
		this.spInd=0;
	}
};

Mesostic.prototype.makePure = function(){
	this.spInd++; 	
	var found= this.getPureWord(this.getSpine().charAt(this.spInd))
	if (found !=0){
		this.poem.push(found);	
	}
	
	if (this.poem.length < this.getSpine().length){
		this.makePure();
	}
	else{
		this.spInd=0;
	}
};

window.Mesostic = Mesostic;