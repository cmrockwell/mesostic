/**
 * @author Chris
 */

describe('Mesostic Generator',function(){
	
	beforeEach(function () {  	

		meso = new Mesostic();
		meso.init("SPINE", "A mesostic is a poem or other typography such that a vertical phrase "+
		"intersects lines of horizontal text. It is similar to an acrostic, but with the vertical"+
		" phrase intersecting the middle of the line, as opposed to beginning each new line.");		
	});

	it('has a spine word',function(){	 		
		expect(meso.getSpine()).toEqual("SPINE");
	});

	it('can have the spine word changed',function(){
		meso.setSpine("OSTIC");	 		
		expect(meso.getSpine()).toEqual("OSTIC");
	});

	it('has seed text', function() {
		expect(meso.getSeed(1)).toEqual("mesostic");
	});
	
	it('finds the first word that contains a letter from the spine word',function(){	 		
		expect(meso.getWord(0)).toEqual("meSostic");
	});

	it('current letter \'o\' next letter is \'s\', get pure word should not return a word with an \'s\' after the \'o\'',function(){	 		
		meso.setSpine("OSTIC");
		meso.type='50';
		expect(meso.getPureWord(0)).toEqual("pOem"); //not 'mesOstic' (1st), not 'Or' (3rd)
	});  
/////////////////////DISABLED
	xit('the found word does not repeat spine letter in found word',function(){	 		
		expect(meso.getPureWord('S')).toEqual("is");
	});  
	
	xit('gives an index of the next word in the seed text',function(){	
		meso.getPureWord('S'); 		
		expect(meso.getIndex()).toEqual(3);
	});  
	
	xit('reduces the seed text array elements that are before the found word',function(){	 				
		var len = meso.textArr.length;
		meso.getPureWord('S'); 
		expect(len).toEqual(meso.textArr.length+3);
	});  
///////////////////////////////		
	it('give a non pure mesostic',function(){	
		meso.makeNonPure(); 		
		expect(meso.poem.toString()).toEqual("meSostic,Poem,vertIcal,iNtersects,linEs");
	});  

	it('give a pure mesostic',function(){	
		meso.setSpine("SON");
		meso.makePure(50); 		
		expect(meso.poem.toString()).toEqual("iS,pOem,iNtersects");
	});  

	it('can handle spaces',function(){	
		meso.setSpine("IS HAT");
		meso.makeNonPure(); 		
		expect(meso.poem.toString()).toEqual("mesostIc,iS, ,otHer,typogrAphy,That");
	}); 
	
	it('has a max index', function(){
		meso.setSpine("IS HAT");
		meso.makeNonPure(); 
		expect(meso.maxIndexOfSpineLtr).toEqual(6);	
	});
	
	it('breaks the word into 2 substrings; one before \'p\' and one after \' em\' the spine letter', function(){
		meso.type= '100';
		meso.setSpine("SOAP");
		meso.getPureWord(1); 
		expect(meso.before+" "+meso.after).toEqual("p em");//
	});

	it('breaks the word into 2 substrings; one before \'mes\' and one after \'stic\' the spine letter', function(){
		meso.type= '50';
		meso.setSpine("POAM");
		meso.getPureWord(1); 
		expect(meso.before+" "+meso.after).toEqual("mes stic");//
	});	

	it('type 100 does not repeat the current spine letter' , function(){
		meso.type= '100';
		meso.setSpine("SUPER");
		expect(meso.getPureWord(0)).toEqual("iS"); 		
	});
	
	it('type 50 can repeat the current spine letter' , function(){
		meso.type= '50';
		meso.setSpine("SUPER");
		expect(meso.getPureWord(0)).toEqual("meSostic"); 		
	});
//call me ishmael
	it('type 50 can have previous spine letter in the before substring' , function(){
		meso.setSpine("call me ishmael");
		meso.type= '50';
		expect(meso.getPureWord(2)).toEqual("verticaL"); 		
	});
//call me 

});