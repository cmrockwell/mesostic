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
	
	it('finds the first word that contains a letter from the spine word',function(){	 		
		expect(meso.getWord('S')).toEqual("mesostic");
	});

	it('the found word does not repeat spine letter in found word',function(){	 		
		expect(meso.getPureWord('S')).toEqual("is");
	});  
	
	it('gives an index of the next in the seed text',function(){	
		meso.getPureWord('S'); 		
		expect(meso.getIndex()).toEqual(3);
	});  
	
	it('reduces the seed text array',function(){	 		
		meso.getWord('S');// populate the array
		var len = meso.textArr.length;
		meso.getPureWord('S'); 
		expect(len).toEqual(meso.textArr.length+3);
	});  
		
	
});