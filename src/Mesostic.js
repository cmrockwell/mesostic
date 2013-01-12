/**
 * @author Chris
 */
var Mesostic = function() {
	var spineWord="";
	var seedText="";
	this.type = 'basic';
	this.poem=[];
	this.spineLtrs = [];
    this.maxIndexOfSpineLtr =0;
	this.textArr=[];
	this.textCopy=[];
	this.index = 0; // refers to place in seed text
	this.spInd = -1; // refers to place in spine word
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
    this.type = 'basic';
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
    this.textCopy = this.textArr;
};

Mesostic.prototype.getSeed = function(ind) {
    return this.textArr[ind]; // returns the seed word at the index
};

Mesostic.prototype.processFound = function(letterIndex, word, seedIndex){
	var letter = this.getSpine().charAt(letterIndex);
	this.index = seedIndex+1; // store the place in the seed text array
	word = word.toLowerCase(); //
	letter = letter.toLowerCase(); 
	var ltrInd = word.indexOf(letter);
	this.spineLtrs.push(ltrInd);	
	if(ltrInd > this.maxIndexOfSpineLtr){
		this.maxIndexOfSpineLtr = ltrInd;	
		}	
	// uppercase the spine letter.  the rest will be lower case	
	var fw = word.substring(0, ltrInd) + word[ltrInd].toUpperCase() + word.substring(ltrInd+1);
	this.textArr = this.textArr.slice(this.index); // reduce the seed text array
	return fw;
};

Mesostic.prototype.getWord = function(ind){ 
	var letter = this.getSpine().charAt(ind);
	if (letter ===' '){	 // preserve the spaces
		this.spineLtrs.push(0);	
		return letter;
	}
	
	var patternStr = new RegExp('[a-z]*'+letter+'[a-z]*','i'); 
	
	
	for (var i=0; i<this.textArr.length; i++){// loop thru seed text 
		if (patternStr.test(this.textArr[i])){  // find next word from seed text that matches pattern
			return this.processFound(ind, this.textArr[i], i); //letterIndex, word, seedIndex
		}
		else{
			continue;
		} 
	}
	//return 0;// reached the end but there was no match
};

Mesostic.prototype.getType = function(){
	return type;
};

Mesostic.prototype.getPureWord = function(ind){ // pass index number for reference to a spine letter
	
	var letter = this.getSpine().charAt(ind);
	var previous =""; //spine letter
	var next =""; //spine letter
	var ltrPtrn = new RegExp('([a-z]*'+letter+'[a-z]*){1}','i'); 
	var ltrPtrnCheckFor2Plus = new RegExp('([a-z]*'+letter+'[a-z]*){2}','i'); 
	
	var prevPtrn = new RegExp('[^a-z-\']+','i');// default pattern for first and last; matches no word
	var nextPtrn = new RegExp('[^a-z-\']+','i');

	if (letter ===' '){	 // preserve the spaces
		this.spineLtrs.push(0); //used for determining alignment	
		return letter;
	}	
	
	if(ind<this.getSpine().length-1 ){ // not the last spine letter, last does not have next 
		next = this.getSpine().charAt(ind+1); 
		nextPtrn = new RegExp('[a-z]*'+next+'[a-z]*','i');		
	}

	if(ind>0){ // not the first spine letter. first does not have previous 
		previous = this.getSpine().charAt(ind-1);
		//prevPtrn = new RegExp('[a-z]*'+previous+'[a-z]*','i'); //
		if (this.type =='100'){
			prevPtrn = new RegExp('[a-z]*('+previous+'|'+letter+')[a-z]*','i');		
		}
		else if (this.type =='50'){
			prevPtrn = new RegExp('[a-z]*'+letter+'[a-z]*','i'); //
		}
	}
		
	for (var i=0; i<this.textArr.length; i++){// loop thru seed text 
		if(ltrPtrn.test(this.textArr[i]))  // contains the letter
		{  		
			var fwInd = this.textArr[i].indexOf(letter); // index of letter in found word
			if (fwInd<0){ // if not found check lower case
				fwInd = this.textArr[i].indexOf(letter.toLowerCase());}
			
			this.before = this.textArr[i].substring(0, fwInd); // before substring, check it does NOT have the previous letter	
						// could be "" if found word begins with the spine letter
			this.after = this.textArr[i].substring(fwInd +1); // after substring, check it does NOT have the next letter
			
			if(this.before.length===0 && this.after.length!==0){ // found word begins with the spine letter
				if(!nextPtrn.test(this.after)){
					////////////////RETURN TO DO  if type 100 and letter not present more than once
					
					if (this.type=='100' && !ltrPtrnCheckFor2Plus.test(this.textArr[i])){ // if its 100% and word does not contain letter 2 or more times
						return this.processFound(ind, this.textArr[i], i); //letterIndex, word, seedIndex
						
					}
					else if (this.type=='50'){return this.processFound(ind, this.textArr[i], i); }
				}
			}
			else if (this.after.length===0 && this.before.length!==0){ // found word ends with the spine letter
				if(!prevPtrn.test(this.before)){
					if(!nextPtrn.test(this.after)){
						
						////////////////RETURN TO DO  if type 100 and letter not present more than once
						if (this.type=='100' && !ltrPtrnCheckFor2Plus.test(this.textArr[i])){ 
							return this.processFound(ind, this.textArr[i], i); //letterIndex, word, seedIndex
						}
						else if (this.type=='50'){return this.processFound(ind, this.textArr[i], i); }
					}
				}				
			}
			else if (!prevPtrn.test(this.before) && !nextPtrn.test(this.after)){ // check middle letters
				
				// does NOT have the previous letter in the first part AND does NOT have the next letter in the second part
				if(!nextPtrn.test(this.after)){
					
					////////////////RETURN TO DO  if type 100 and letter not present more than once
					if (this.type=='100' && !ltrPtrnCheckFor2Plus.test(this.textArr[i])){ 
						return this.processFound(ind, this.textArr[i], i); //letterIndex, word, seedIndex						
					}
					else if (this.type=='50'){return this.processFound(ind, this.textArr[i], i); }
				}
			}
			else{
				continue;
			} 
		}			
	}
};
	

Mesostic.prototype.getIndex = function(){
	return this.index;
};

Mesostic.prototype.makeNonPure = function(){// todo: move the mesostic engine to another method.  
	this.spInd++; 	
	this.type = 'basic';
	var found= this.getWord(this.spInd);//this.getSpine().charAt(this.spInd));
	if (found !==0){
		this.poem.push(found);	
		}
	if (this.poem.length < this.getSpine().length){
		this.makeNonPure(); // recursive call to make nonpure
	}
	else{ 
		this.spInd=0;
	}
};

Mesostic.prototype.makePure = function(selectType){
	if(selectType){
		this.type = selectType;
	}
	
	this.spInd++; 	
	
	var found= this.getPureWord(this.spInd);//returns a word from the seed text based on the spine index
	if (found !==0){ // 0 indicates the end of the seed was reached before a match was made
		this.poem.push(found);	// push the word to the poem
		}
	if (this.poem.length < this.getSpine().length){
		this.makePure();// recursive call to make pure
	}
	else{ 
		this.spInd=0;
	}
};

window.Mesostic = Mesostic;