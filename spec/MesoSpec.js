/**
 * @author Chris
 */

describe('Mesostic Generator',function(){
	
	beforeEach(function () {  	

		meso = new Mesostic();
		//meso.init(); 
		meso.setSpine("SPINE");
		meso.setSeed("A mesostic is a poem or other typography such that a vertical phrase"+
		"intersects lines of horizontal text. It is similar to an acrostic, but with the vertical"+
		" phrase intersecting the middle of the line, as opposed to beginning each new line.")
	});

	it('has a spine word',function(){	 		
		expect(meso.getSpine()).toEqual("SPINE");
	});

	it('has seed text', function() {
		expect(meso.getSeed(1)).toEqual("mesostic");
	});
	
	xit('finds the next word that contains the current letter in the spine word',function(){	 		
		expect(meso.getWord(0)).toEqual("mesostic");
	});

	xit('the found word does not contain next spine letter after the current letter in found word',function(){	 		
		expect(meso.getWord(1)).toEqual("mesostic");
	});  
	
	xit('the found word does not repeat current spine letter (only for 100% mesostic)',function(){	 		
		expect(meso.getWord(2)).toEqual("mesostic");
	});  	
  
});