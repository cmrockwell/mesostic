/**
 * @author Chris
 */
var Mesostic = function() {
	var spineWord="";
	var seedText="";
	var type = 'basic';
	this.poem=[];
	this.spineLtrs = [];
    this.maxIndexOfSpineLtr =0;
	this.textArr=[];
	this.index = 0; // refers to place in seed text
	this.spInd = -1; // refers to place in spine word
	var type = 'basic';
	this.before ="";
	this.after="";
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
    type = 'basic';
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
    this.textArr = seedText.match(pattern); // creates array of seed text
};

Mesostic.prototype.getSeed = function(ind) {
    return this.textArr[ind]; // returns the seed word at the index
};

Mesostic.prototype.getWord = function(letter){ 
	if (letter ===' '){	 // preserve the spaces
		this.spineLtrs.push(0);	
		return letter;
	}
	
	var patternStr = new RegExp('[a-z]*'+letter+'[a-z]*','i'); 
	
	for (var i=0; i<this.textArr.length; i++){// loop thru seed text 
		if (patternStr.test(this.textArr[i])){  // find next word from seed text that matches pattern
				this.index = i+1;
				var foundWord = this.textArr[i].toLowerCase();
				letter = letter.toLowerCase();
				var ltrInd = foundWord.indexOf(letter);
				this.spineLtrs.push(ltrInd);	
				if(ltrInd > this.maxIndexOfSpineLtr){
					this.maxIndexOfSpineLtr = ltrInd;	
				}	
				// uppercase the spine letter.  the rest will be lower case	
				var fw = foundWord.substring(0, ltrInd) + foundWord[ltrInd].toUpperCase() + foundWord.substring(ltrInd+1);
				this.textArr = this.textArr.slice(this.index); // reduce the seed text array
				return fw;
			}
		else{
			continue;
		} 
	}
	return 0;// reached the end but there was no match
};

Mesostic.prototype.getType = function(){
	return type;
};

Mesostic.prototype.getPureWord = function(ind){ // pass index number for reference to a spine letter
	var letter = this.getSpine().charAt(ind);
	var previous ="";
	var next ="";
	var ltrPtrn = new RegExp('[a-z]*'+letter+'[a-z]*','i'); 
	var prevPtrn = /./; // dot matches all
	var nextPtrn = /./; 
	
	if(ind<this.getSpine().length-1){ // not the last letter
		next = this.getSpine().charAt(ind+1); 
	}
	
	if(ind>0){ // not the first
		previous = this.getSpine().charAt(ind-1);
	}	
	
	if (letter ===' '){	 // preserve the spaces
		this.spineLtrs.push(0);	
		return letter;
	}	
	
	for (var i=0; i<this.textArr.length; i++){// loop thru seed text 
		if(ltrPtrn.test(this.textArr[i])){ // check if it has the letter
			this.before = this.textArr[i].substing(0, ind); // before string, check it does NOT have the previous	
			this.after = this.textArr[i].substing(ind+1); // after string, check it does NOT have the next				
			}
		}
};
	
	
	

	
	/*
	regexCheckFor1 = new RegExp('([a-z]*'+ letter +'[a-z]*){1}','i'); // check ltr exists once or more
	regexCheckFor2plus = new RegExp('([a-z]*'+letter+'[a-z]*){2}','i'); // check ltr exists twice or more	
	//var regexCheckFor1 = /[a-z-']+/i; // any word
	//var regexCheckFor2plus = / +/; // one or more spaces
	/*if (this.getType() ==='100'){ //100% check the next letter
		regexCheckFor1 = new RegExp('([a-z]*'+ letter +'[a-z]*){1}','i'); // check ltr exists once or more
		regexCheckFor2plus = new RegExp('([a-z]*'+letter+'[a-z]*){2}','i'); // check ltr exists twice or more		
	}*/	
	// for 100% and 50%
	/*if (nextLtr){
		var regexCheckForNext1 = new RegExp('([a-z]*'+nextLtr+'[a-z]*){1}','i'); // check ltr exists once or more
		var regexCheckForNext2plus = new RegExp('([a-z]*'+nextLtr+'[a-z]*){2}','i'); // check ltr exists twice or more
	}*/
	/*
	for (var i=0; i<this.textArr.length; i++){
		if (regexCheckFor1.test(this.textArr[i]) && !regexCheckFor2plus.test(this.textArr[i])
			/*&& regexCheckForNext1.test(this.textArr[i]) && !regexCheckForNext2plus.test(this.textArr[i]) *///){				
			/*	this.index = i+1;
				var foundWord = this.textArr[i];
				this.textArr = this.textArr.slice(this.index);
				return foundWord;
			}
		else{
			continue;
		} 
	}
	return 0;// reached the end but there was no match*/
//};

Mesostic.prototype.getIndex = function(){
	return this.index;
};

Mesostic.prototype.makeNonPure = function(){// todo: move the mesostic engine to another method.  
	//only thing to do here is set the regex and fire the engine
	this.spInd++; 	
	type = 'basic';
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

Mesostic.prototype.makePure = function(type){
	if(type===50){
		type = '50';
		//////todo set the regex for 50%
	}else if (type===100){
		type = '100';
		//////todo set the regex for 100%
	}

};

window.Mesostic = Mesostic;