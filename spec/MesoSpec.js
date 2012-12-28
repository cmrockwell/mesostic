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

	it('has seed text', function() {
		expect(meso.getSeed(1)).toEqual("mesostic");
	});
	
	it('finds the first word that contains a letter from the spine word',function(){	 		
		expect(meso.getWord('S')).toEqual("meSostic");
	});

	xit('the found word does not have next spine letter in found word after current letter',function(){	 		
		meso.setSpine = 'OSTIC';
		expect(meso.getPureWord('O')).toEqual("poem");
	});  

	it('the found word does not repeat spine letter in found word',function(){	 		
		expect(meso.getPureWord('S')).toEqual("is");
	});  
	
	it('gives an index of the next word in the seed text',function(){	
		meso.getPureWord('S'); 		
		expect(meso.getIndex()).toEqual(3);
	});  
	
	it('reduces the seed text array elements that are before the found word',function(){	 				
		var len = meso.textArr.length;
		meso.getPureWord('S'); 
		expect(len).toEqual(meso.textArr.length+3);
	});  
		
	it('give a non pure mesostic',function(){	
		meso.makeNonPure(); 		
		expect(meso.poem.toString()).toEqual("meSostic,Poem,vertIcal,iNtersects,linEs");
	});  

	it('give a pure mesostic',function(){	
		meso.setSpine("SON");
		meso.makePure(); 		
		expect(meso.poem.toString()).toEqual("is,poem,intersects");
	});  

	it('can handle spaces',function(){	
		meso.setSpine("IS HAT");
		meso.makeNonPure(); 		
		expect(meso.poem.toString()).toEqual("mesostIc,iS, ,otHer,typogrAphy,That");
	}); 
	
	it('has a has a max index', function(){
		meso.makeNonPure(); 
		expect(meso.maxIndexOfSpineLtr).toEqual(4);	
	});
	
});